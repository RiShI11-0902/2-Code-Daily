const { chatSession } = require("../aiConfig");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");
const { generateInterviewFromJD } = require("../utils/prompts");

exports.createInterview = async (req, res) => {
  try {
    const { jd, email } = req.body;

    console.log(jd,email);
    

    if (!email)
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Please Enter Your Email in Box, if done then-  Sign Up on https://2codedaily.com ",
        });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          message: "Please Sign Up First on https://2codedaily.com ",
        });

    const interview = generateInterviewFromJD(jd);

    const aiResponse = await chatSession.sendMessage(interview);

    const markupJson = aiResponse.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");

    const finalJson = JSON.parse(markupJson);

    for (const interview of finalJson) {
      // Extract question text strings
      const questionTexts = interview.questions.map((q) => q.question);

      // Create and save using your model
      const newInterview = new Interview({
        problem: interview.title, // maps to your `problem` field
        questions: questionTexts,
        createdAt: new Date(),
      });
      user.interviewGiven.push(newInterview.id);
      await user.save();
      await newInterview.save();

    }

    res
      .status(200)
      .json({ success: true, message: "Opps! Something Went Wrong Please Try Again Later" });
  
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Opps! Something Went Wrong Please Try Again Later" });
  }
};
