const  Inggest  = require("inngest").Inngest;
const User = require("../models/user");
// const { analyzeAndGeneratePlan, solvedQuestions } = require("../controller/userController");

const { chatSession } = require("../aiConfig");

const inngest = new Inggest(
    {id: 'Leetcode Extension'},
    { name: "2 Code daily" }
);

exports.analyzeUserProgress = inngest.createFunction(
  { name: "Analyze Progress" },
  { cron: "0 0 * * 0" },
  async ({ event, step }) => {

    const users = await User.find({ isSubscribed: true }).populate(
      "solvedQuestions"
    );

    for (const user of users) {
      // await analyzeAndGeneratePlan(user)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentQuestions = user.solvedQuestions.map((q) => {
        new Date(q.createdAt) >= sevenDaysAgo
      });

      const userProgress = {
        name: user.name,
        email: user.email,
        solvedQuestions: recentQuestions.map((q)=>({
            question: q.problem,
            correctness: q.correctness,
            feedback: q.feedback
        }))
      }

      if(recentQuestions.length == 0) return

      const prompt = `
        This is the progress ${userProgress} of last seven days of coding interview given by the user. your task is to analyze this data and create a future plan for the user on what they have to study and focus on which topics and also the difficult level of the problems they should solve.

        IMPORTANT: Give your response in json with the following keys:
        1) topics: contains the name of topics they have to study in future
        2) focus: contains the focus area e.g focus on efficieny,optimixation etc
        3) difficult: contains the difficult level of problem and the problem name in short e.g two sum

        Give your response in JSON onl format with the keys given above only
      `

      const aiAnalyze = await chatSession.sendMessage(prompt)
      const markUpJSON = aiAnalyze.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");
    
    const finalJson = JSON.parse(markUpJSON);
    
    }
  }
);

module.exports = { inngest };
