const { chatSession } = require("../aiConfig");
const Email = require("../models/emailSchema");
const User = require("../models/user");

exports.solvedQuestions = async (req, res) => {

  const { id } = req.body;

  const user = await User.findById(id)
  .select('solvedQuestions')
  .populate('solvedQuestions');

  const foundQuestions = user.solvedQuestions.filter(q => q.correctness && q.feedback)

  if (foundQuestions) {
    res.status(200).json({ questions: foundQuestions });
  } else {
    res.status(200).json({ message: "No questions Found" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id).populate("solvedQuestions");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const foundQuestions = user.solvedQuestions.filter(q => q.correctness && q.feedback)

    const totalCorrectness = foundQuestions.reduce((sum, interview) => {
      return sum + interview.correctness
    }, 0);

    
    const avg = totalCorrectness / foundQuestions.length;

    const progressData = user.solvedQuestions.map((interview) => ({
      date: interview.createdAt,
      correctness: interview.correctness,
    }));    

    res.status(200).json({ average: avg, progressData: progressData });
  } catch (error) {
    res.status(400).json({ error: error.message });    
  }
};

exports.totalUsers = async (req, res) => {
  try {
    const total = await User.find().countDocuments();
    res.status(200).json({ success: true, totalUsers: total });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

exports.emails = async (req, res) => {

  try {
    const { email } = req.body;

    const newEmail = new Email({
      email
    });

    await newEmail.save();

    res
      .status(200)
      .json({ success: true, message: "Thank You for your Email!" });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

exports.analyzeAndGeneratePlan = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findOne({ _id: id })
      .populate("solvedQuestions")
      .select("-password");

    const solvedQuestions = user?.solvedQuestions || [];

    // Sort by createdAt (oldest to newest)
    solvedQuestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const totalSolved = solvedQuestions.length;
    const lastAnalyzedCount = user.lastAnalyzedCount || 0;
    const newQuestionsCount = totalSolved - lastAnalyzedCount;

    if (newQuestionsCount < 10) {
      return res.status(400).json({
        message: `Not enough new questions solved since last analysis. Only ${newQuestionsCount} new solved.`,
      });
    }

    // Get the next 10 questions to analyze
    const newBatch = solvedQuestions.slice(lastAnalyzedCount, lastAnalyzedCount + 10);

    const extractText = (str) => {
      let strIndex = str.indexOf("?") + 1;
      let end = str.indexOf("\n", strIndex);
      return str.substring(strIndex, end).trim();
    };

    const userProgress = newBatch.map((q) => ({
      question: extractText(q.problem),
      feedback: q.feedback,
      correctness: q.correctness,
    }));

    const prompt = `
      This is the progress ${JSON.stringify(userProgress, null, 2)} of coding interviews attempted by the user. 
      Your task is to analyze this data and create a future plan on what they should study, focus areas, and 
      problem difficulty level. Make the feedback personalized and achievable

      IMPORTANT: Give your response in JSON with the following keys:
      1) topics: contains the name of topics they have to study in future as a string only in detail.
      2) focus: contains the focus area e.g focus on efficiency, optimization etc in string only.
      3) difficult: contains the difficulty level of problems to solve in string only.

      Respond with JSON only.
    `;

    const aiAnalyze = await chatSession.sendMessage(prompt);
    const markUpJSON = aiAnalyze.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");

    const finalJson = JSON.parse(markUpJSON);

    // Store the analysis
    user.improvements.push({ analysis: finalJson, dateCreated: Date.now() });

    // Update the last analyzed count
    user.lastAnalyzedCount = lastAnalyzedCount + 10;

    await user.save();

    res.status(200).json({
      message: "Analysis Generated",
      analysis: finalJson,
      dateCreated: Date.now(),
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.checked_question = (req,res)=>{
  try {
    const {qId, userId} = req.body
    // const 
  } catch (error) {
    console.log(error);
    
  }
}
