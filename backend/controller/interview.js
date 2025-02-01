require("dotenv").config();
const { chatSession } = require("../aiConfig");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");

exports.getProblem = async (req, res) => {
  //   console.log(req);

  const { problem, email } = req.body;
  console.log(req.body);
  

  //   const propmt = `You are an expert coding interviewer and problem-solving mentor. Your role is to assist users in solving coding problems efficiently by providing clear, concise overviews of problems, explaining their key concepts, Encourage the user by asking:  .
  //   The user is solving the following problem:

  // Problem Statement: ${problem}

  // Provide the following:

  // A concise overview of the problem in simpler terms, explaining its objective and what the user needs to solve.
  //  Give your output in json format with question as a single key and keep it short not long and include "What is your initial thought or approach to solving this? Can you identify any patterns or specific cases in the problem?" only ask for brute force approach and concise overview of the problem in simpler terms dont ask for any challeneges or aptimal solutions
  //   `;

  const prompt = `You are an expert coding interviewer and taking an interview of the user. you have to ask this ${problem} to the user in a short concise way, ask the user for their initial thought process only not any coding or anything. give them an small example  Give your output in json format with question as a single key  `;
  const aiResponse = await chatSession.sendMessage(prompt);

  const markupJson = aiResponse.response
    .text()
    .replace(/```json/, "")
    .replace(/```/, "")
    .replace(/```$/, "");

  const finalJson = JSON.parse(markupJson);

  // console.log(finalJson);

  const user = await User.findOne({ email: email });

  if (user) {
    const newInterview = new Interview();
    newInterview.problem = problem;
    newInterview.questions.push(finalJson.question);
    newInterview.createdAt = Date.now()
    user.solvedQuestions.push(newInterview.id);

    console.log(newInterview);

    await newInterview.save();
    await user.save();

    res.status(200).json({ interview: newInterview });
  } else {
    res.status(401).json({ message: "user is not registered" });
  }
};

exports.getAnswer = async (req, res) => {
  const { answer, id, question, code } = req.body;

  console.log(answer);

  // const userAns = answer.map((res) => res.transcript);

  const cuurInterview = await Interview.findById(id);

  // const user = await User.findOne({email: email})

  const prompt = `You are an experienced coding interviewer conducting a mock technical interview. Your role is to evaluate the candidate's problem-solving abilities and guide them toward better solutions. Follow this structured approach:

3. Evaluate the user's response:
   - If the user provides a brute-force approach, acknowledge their effort and then:
     a. Ask them to identify potential inefficiencies in their solution.
     b. Prompt them to improve their approach, gradually guiding them toward an optimal solution.
   - If the user struggles or their solution is incorrect:
     a. Politely point out the issue and offer a hint to nudge them in the right direction.
     b. Provide step-by-step guidance if asked by the user, while encouraging them to solve the problem independently.
4. As the conversation progresses, ask increasingly refined and challenging questions, ensuring the user thinks critically about optimizations, edge cases, and scalability.
6. Avoid overwhelming the user with too much information at once—guide them one step at a time ask for space nd time complexity of optimal solution.
7. if you are satisfied then End the interaction with a summary of their strengths and areas for improvement, motivating them to continue honing their skills and if they are unable to solve tell them.

Here's the scenario:
- Previous question asked: ${question}
- User Solution: ${answer}
- If the previous question involved code, this is the provided code: ${code}
- dont ask more than 10 question in this interview end it if the user is unable to solve

Generate your response in JSON format using the key next_question only and if you are ending the interview just put the feedback key and correctness key that will have the correctness of interview in number in the json format only. and if not then include all below things in concise way
- Start with positive reinforcement, highlighting any correct or thoughtful aspects of their approach.
- If the solution is incorrect or incomplete, provide a clear hint or guidance to help them move forward.
- Prompt the user with a question like: "What could you do to optimize this further?" or "How would you handle edge cases for this solution?"
- Maintain a tone that is professional yet encouraging, ensuring the user feels supported in their learning journey. 
 `;

  const aiReply = await chatSession.sendMessage(prompt);

  // console.log(aiReply);

  const markUpJSON = aiReply.response
    .text()
    .replace(/```json/, "")
    .replace(/```/, "")
    .replace(/```$/, "");

  console.log(markUpJSON);

  const finalJson = JSON.parse(markUpJSON);

  if(finalJson.next_question){
    cuurInterview.questions.push(finalJson.next_question);
    cuurInterview.answers.push(answer)
  }else{
    cuurInterview.feedback = finalJson.feedback
    cuurInterview.correctness = finalJson.correctness
  }

  await cuurInterview.save();

  res.status(200).json({ question: finalJson });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const verifedEmail = await User.findOne({ email: email });
    console.log(verifedEmail);
    res.json({"messsage": "user Verified start Practising Leetcode "})
  } catch (error) {
    console.log(error);
    res.json({"messsage": error})
  }
};
