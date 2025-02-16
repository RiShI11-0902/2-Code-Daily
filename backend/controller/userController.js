const { generateToken } = require("../helpers/jwt");
const Interview = require("../models/interviewSchema");
const Suggestion = require("../models/suggestionSchme");
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
      return sum + interview.correctness;
    }, 0);

    const avg = totalCorrectness / user.solvedQuestions.length;

    const progressData = user.solvedQuestions.map((interview)=>({
      date: interview.createdAt,
      correctness: interview.correctness
    }))

    console.log(avg);

    res.status(200).json({ average: avg, progressData:progressData });
  } catch (error) {
    console.log(error);
  }
};

exports.totalUsers = async (req,res)=>{
  try {
    const total = await User.find().countDocuments()
    res.status(200).json({success: true, totalUsers: total})
  } catch (error) {
    res.json({success: false, message: error})
  }
}


exports.suggestions = async (req,res)=>{
  try {
    const {name, suggestion} = req.body

    const newSuggestion = new Suggestion({
      name: name,
      suggestion: suggestion
    })

    await newSuggestion.save()

    res.staus(200).json({success: true, message:'Thank You for your Suggestion!'})
  } catch (error) {
    res.status(400).json({message:"Server Error"})
  }
}

