require("dotenv").config();
const { chatSession } = require("../aiConfig");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");
const { getAnswer, startInterview } = require("../utils/prompts");



exports.getProblem = async (req, res) => {
  try {
    const { problem, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        type: "Website",
        message:
          "We are not able to find your email. Please register at https://2codedaily.com before using this feature.",
      });
    }

    // Free user limit check
    if (!user.isSubscribed && user.freeInterview <= 0) {
      return res
        .status(400)
        .json({ message: "You have completed your free trial. Please subscribe!" });
    }

    const lastPayment = user.payments.at(-1); // Get latest payment safely

    // If subscribed but last payment is not valid
    if (user.isSubscribed) {
      if (!lastPayment || lastPayment.status !== "Paid") {
        return res
          .status(400)
          .json({ message: "No active plan found. Please subscribe." });
      }

      if (lastPayment.usedInterviews >= lastPayment.totalInterviews) {
        return res
          .status(400)
          .json({ message: "You have used all interviews in your plan." });
      }
    }

    // Daily interview limit check
    const result = await checkAndUpdateInterviewLimit(user._id);
    if (!result.allowed) {
      return res.status(400).json({ message: result.message });
    }

    // Start the interview
    const questionPrompt = startInterview(problem);
    const aiResponse = await chatSession.sendMessage(questionPrompt);

    const markupJson = aiResponse.response
      .text()
      .replace(/```json/, "")
      .replace(/```$/, "")
      .replace(/```/, "");

    const finalJson = JSON.parse(markupJson);

    const newInterview = new Interview({
      problem,
      questions: [finalJson.question],
      createdAt: Date.now(),
    });

    user.solvedQuestions.push(newInterview._id);

    await newInterview.save();
    await user.save();

    return res.status(200).json({ interview: newInterview });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const { answer, id, question, code, email, time } = req.body;

    const [interview, user] = await Promise.all([
      Interview.findById(id),
      User.findOne({ email }),
    ]);

    if (!interview || !user) {
      return res.status(404).json({ message: "Interview or user not found." });
    }

    const prompt = getAnswer(question, answer, code);
    const aiReply = await chatSession.sendMessage(prompt);

    const markUpJSON = aiReply.response
      .text()
      .replace(/```json/, "")
      .replace(/```$/, "")
      .replace(/```/, "");

    const finalJson = JSON.parse(markUpJSON);

    interview.answers.push(answer);

    if (finalJson.next_question) {
      interview.questions.push(finalJson.next_question);
    } else {
      interview.feedback = finalJson.feedback;
      interview.correctness = finalJson.correctness;
      interview.time = time;

      if (!user.isSubscribed) {
        user.freeInterview = Math.max(0, user.freeInterview - 1); // safety
      } else {
        const lastPayment = user.payments.at(-1);
        if (lastPayment) {
          lastPayment.usedInterviews += 1;
          if (lastPayment.usedInterviews >= lastPayment.totalInterviews) {
            user.isSubscribed = false;
          }
        }
      }

      await user.save();
    }

    await interview.save();

    return res.status(200).json({ question: finalJson });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const verifedEmail = await User.findOne({ email: email });
    res.json({ messsage: "user Verified start Practising Leetcode " });
  } catch (error) {
    res.json({ messsage: error });
  }
};
