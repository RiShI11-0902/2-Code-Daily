const { chatSession } = require("../aiConfig");
const { generateToken } = require("../helpers/jwt");
const Interview = require("../models/interviewSchema");
const Email = require("../models/emailSchema");
// const Email = require("../models/suggestionSchme");
const User = require("../models/user");

exports.solvedQuestions = async (req, res) => {
  console.log(req.body);

  const { id } = req.body;

  const foundQuestion = await Interview.findById(id);

  if (foundQuestion) {
    res.status(200).json({ question: foundQuestion });
  } else {
    res.status(200).json({ message: "Not correct" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id is" + id);

    const user = await User.findById(id).populate("solvedQuestions");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const totalCorrectness = user.solvedQuestions.reduce((sum, interview) => {
      return sum + ( (interview.correctness != undefined ? interview.correctness  : 0)  && interview.correctness);
    }, 0);

    console.log(user.solvedQuestions.length, totalCorrectness);
    
    const avg = totalCorrectness / user.solvedQuestions.length;

    const progressData = user.solvedQuestions.map((interview) => ({
      date: interview.createdAt,
      correctness: interview.correctness,
    }));

    console.log(progressData);
    

    console.log(avg);

    res.status(200).json({ average: avg, progressData: progressData });
  } catch (error) {
    console.log(error);
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
  console.log("called");

  try {
    const { email } = req.body;

    console.log(req.body);

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

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);    

    const user = await User.findOne({ _id: id }).populate("solvedQuestions");

    const recentQuestions = user?.solvedQuestions?.filter((q) => {
      return new Date(q.createdAt) >= sevenDaysAgo;
    });

    if (recentQuestions?.length == 0) {
      res.status(400).json({ message: "You have not Solved any Question Recently" });
      return;
    }

    const extractText = (str)=>{
      let strIndex = str.indexOf('?') + 1
      let end = str.indexOf('\n', strIndex)
      return str.substring(strIndex,end).trim()
    }

    const userProgress = recentQuestions.map((q)=>({
      question: extractText(q.problem),
      feedback: q.feedback,
      correctness: q.correctness
    }))
  //  console.log(userProgress.map((i)=> i)); 
    const prompt = `
        This is the progress ${JSON.stringify(userProgress,null,2)} of last seven days of coding interview given by the user. your task is to analyze this data and create a future plan for the user on what they have to study and focus on which topics and also the difficult level of the problems they should solve. make it like a feedback don't just name the topics and make the feedback acheivable in seven days for the user. also include the time and days they should give them make it personalize to them.

        IMPORTANT: Give your response in json with the following keys:
        1) topics: contains the name of topics they have to study in future as an string only in detail.
        2) focus: contains the focus area e.g focus on efficieny,optimixation etc in string only
        3) difficult: contains the difficult level of problem to solve in string in string

        Give your response in JSON only format with the keys given above only
      `;

    const aiAnalyze = await chatSession.sendMessage(prompt);
    const markUpJSON = aiAnalyze.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");

    const finalJson = JSON.parse(markUpJSON);

    console.log(finalJson);

    user?.improvements?.push({ analysis: finalJson, dateCreated: Date.now() });

    await user.save()

    res.status(200).json({messsage:"Generated", analysis: finalJson, dateCreated: Date.now() })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
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
