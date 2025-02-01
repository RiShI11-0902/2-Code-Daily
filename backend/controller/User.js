const { use } = require("passport");
const { generateToken } = require("../helpers/jwt");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");
const { json } = require("express");
const { instance } = require("../paymentConfig/razorpayConfig");

exports.checkauth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Found " });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
};

exports.register = async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body.form;
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User already Exits" });
      return;
    }

    const newUser = new User();
    // const hashedPassword = // for hashing password
    newUser.email = email;
    newUser.name = name;
    newUser.password = password;

    newUser.save();

    const userWithoutPass = { ...newUser._doc };
    delete userWithoutPass.password;

    generateToken(res, newUser._id);

    res.status(200).json({ message: "user registered", user: userWithoutPass });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.logout = (req, res, next) => {
  console.log("log outtttt");

  req.logout(req.user, (err) => {
    if (err) {
      return next(err);
    }
    console.log("Suucess");

    res.clearCookie("connect.sid");
    // res.redirect("/");
    res.status(200).json({ message: "success" });
  });
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


