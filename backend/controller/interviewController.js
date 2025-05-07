require("dotenv").config();
const { chatSession } = require("../aiConfig");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");
const { getAnswer, startInterview } = require("../utils/prompts");

exports.getProblem = async (req, res) => {
  try {
    const { problem, email } = req.body;
    const user = await User.findOne({ email: email });
    
    if (!user) {      
      res.status(400).json({
        type:'Website',
        message: "We are not able to find your email please register on website",
      });
      return
    }

    if (user.freeInterview <= 0 && !user.isSubscribed) {
      res.status(400).json({
        message: "You have Completed Your Free Trial Please Subscribed!",
      });
      return;
    }

    const lastPayment = user.payments[user.payments.length - 1];

    if (lastPayment &&  lastPayment.status != 'Paid') {      
       res
        .status(400)
        .json({ message: "No active plan found, please subscribe." });
        return
    }

    if ( lastPayment && lastPayment.usedInterviews >= lastPayment.totalInterviews) {
       res
        .status(400)
        .json({ message: "You have used all interviews in your plan." });
        return
    }

    const question = startInterview(problem)

    const aiResponse = await chatSession.sendMessage(question);

    const markupJson = aiResponse.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");

    const finalJson = JSON.parse(markupJson);
   
      if (user.isSubscribed || user.freeInterview <= 3) {
        const newInterview = new Interview();
        newInterview.problem = problem;
        newInterview.questions.push(finalJson.question);
        newInterview.createdAt = Date.now();
        user.solvedQuestions.push(newInterview.id);

        await newInterview.save();
        await user.save();

        res.status(200).json({ interview: newInterview });
      } else {
        res
          .status(400)
          .json({ message: "Internal Server Error" });
      }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const { answer, id, question, code, email } = req.body;

    const cuurInterview = await Interview.findById(id);

    const user = await User.findOne({ email });

    const prompt = getAnswer(question,answer,code);

    const aiReply = await chatSession.sendMessage(prompt);

    const markUpJSON = aiReply.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");

    const finalJson = JSON.parse(markUpJSON);

    if (finalJson.next_question) {
      cuurInterview.questions.push(finalJson.next_question);
      cuurInterview.answers.push(answer);
    } else {
      cuurInterview.feedback = finalJson.feedback;
      cuurInterview.correctness = finalJson.correctness;
      cuurInterview.answers.push(answer);
      if (!user.isSubscribed) {
        user.freeInterview -= 1;
      } else {
        const lastPayment = user.payments[user.payments.length - 1];
        lastPayment.usedInterviews += 1;
        lastPayment.usedInterviews == lastPayment.totalInterviews ? user.isSubscribed = false : ''
      }
      await user.save();
    }

    await cuurInterview.save();

    res.status(200).json({ question: finalJson });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
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
