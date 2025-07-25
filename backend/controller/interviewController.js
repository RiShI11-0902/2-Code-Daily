require("dotenv").config();
const { chatSession } = require("../aiConfig");
const { checkAndUpdateInterviewLimit } = require("../helpers/checkLimit");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");
const { getAnswer, startInterview } = require("../utils/prompts");

// exports.getProblem = async (req, res) => {
//   try {
//     const { problem, email } = req.body;
//     const user = await User.findOne({ email: email });
    
//     if (!user) {      
//       res.status(400).json({
//         type:'Website',
//         message: "We are not able to find your email please register on website ( https://2codedaily.com ) then enter the email down below",
//       });
//       return
//     }

//     if (user.freeInterview <= 0 && !user.isSubscribed) {
//       res.status(400).json({
//         message: "You have Completed Your Free Trial Please Subscribed!",
//       });
//       return;
//     }

//     const lastPayment = user.payments[user.payments.length - 1];

//     if (lastPayment &&  lastPayment.status != 'Paid') {      
//        res
//         .status(400)
//         .json({ message: "No active plan found, please subscribe." });
//         return
//     }

//     if ( lastPayment && lastPayment.usedInterviews >= lastPayment.totalInterviews) {
//        res
//         .status(400)
//         .json({ message: "You have used all interviews in your plan." });
//         return
//     }

//     const result = await checkAndUpdateInterviewLimit(user._id)
//     if(!result.allowed){
//       res
//         .status(400)
//         .json({ message: result.message });
//         return
//     }

//     const question = startInterview(problem)

//     const aiResponse = await chatSession.sendMessage(question);

//     const markupJson = aiResponse.response
//       .text()
//       .replace(/```json/, "")
//       .replace(/```/, "")
//       .replace(/```$/, "");

//     const finalJson = JSON.parse(markupJson);
   
//       if (user.isSubscribed || user.freeInterview <= 3) {
//         const newInterview = new Interview();
//         newInterview.problem = problem;
//         newInterview.questions.push(finalJson.question);
//         newInterview.createdAt = Date.now();
//         user.solvedQuestions.push(newInterview.id);

//         await newInterview.save();
//         await user.save();

//         res.status(200).json({ interview: newInterview });
//       } else {
//         res
//           .status(400)
//           .json({ message: "Internal Server Error" });
//       }
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };
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

// exports.getAnswer = async (req, res) => {
//   try {
//     const { answer, id, question, code, email, time } = req.body;

//     const cuurInterview = await Interview.findById(id);

//     const user = await User.findOne({ email });

//     const prompt = getAnswer(question,answer,code);

//     const aiReply = await chatSession.sendMessage(prompt);

//     const markUpJSON = aiReply.response
//       .text()
//       .replace(/```json/, "")
//       .replace(/```/, "")
//       .replace(/```$/, "");

//     const finalJson = JSON.parse(markUpJSON);

//     if (finalJson.next_question) {
//       cuurInterview.questions.push(finalJson.next_question);
//       cuurInterview.answers.push(answer);
//     } else {
//       cuurInterview.feedback = finalJson.feedback;
//       cuurInterview.correctness = finalJson.correctness;
//       cuurInterview.time = time
//       cuurInterview.answers.push(answer);
//       if (!user.isSubscribed) {
//         user.freeInterview -= 1;
//       } else {
//         const lastPayment = user.payments[user.payments.length - 1];
//         lastPayment.usedInterviews += 1;
//         lastPayment.usedInterviews == lastPayment.totalInterviews ? user.isSubscribed = false : ''
//       }
//       await user.save();
//     }

//     await cuurInterview.save();

//     res.status(200).json({ question: finalJson });
//   } catch (error) {
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };
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
