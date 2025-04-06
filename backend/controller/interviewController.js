require("dotenv").config();
const { chatSession } = require("../aiConfig");
const Interview = require("../models/interviewSchema");
const User = require("../models/user");

exports.getProblem = async (req, res) => {

  try {
    const { problem, email } = req.body;

    const findUSer = await User.findOne({email: email})

    if(findUSer.freeInterview > 3){
      res.status(200).json({message: "You have Completed Your Free Trial!"})
      return
    }
  
    const prompt = `You are an expert coding interviewer working in an faang and taking an interview of the user. you have to ask this ${problem} to the user in a short concise way as an real person who takes the interview, ask the user for their initial thought process only not any coding or anything. give them an small example  Give your output in json format with question as a single key  `;
    const aiResponse = await chatSession.sendMessage(prompt);
  
    const markupJson = aiResponse.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .replace(/```$/, "");
  
    const finalJson = JSON.parse(markupJson);
    
    const user = await User.findOne({ email: email });
  
    if (user) {
      if(user.isSubscribed || user.freeInterview <= 3){
        const newInterview = new Interview();
        newInterview.problem = problem;
        newInterview.questions.push(finalJson.question);
        newInterview.createdAt = Date.now()
        user.solvedQuestions.push(newInterview.id);
        
        await newInterview.save();
        await user.save();
    
        res.status(200).json({ interview: newInterview });
      }else{
        res.status(400).json({message:'Frremium Ended Please Update to Premium'})
      }
    } 
    else {
      res.status(401).json({ message: "User is Not Registered" });
    }
  } catch (error) {
    res.status(400).json({message: error})
  }

 
};

exports.getAnswer = async (req, res) => {

  try {
    const { answer, id, question, code, email } = req.body;

  console.log(email);
  console.log("called");
  

  // const userAns = answer.map((res) => res.transcript);

  const cuurInterview = await Interview.findById(id);

  const user = await User.findOne({email})

  console.log(email);
  

  const prompt = `You are an experienced coding interviewer conducting a mock technical interview. Your role is to evaluate the candidate's problem-solving abilities and guide them toward better solutions.

  Here's the scenario:
- Previous question asked: ${question}
- User Solution: ${answer}
- If the previous question involved code, this is the provided code: ${code}
- dont ask more than 10 question in this interview end it if the user is unable to solve

Generate your response in JSON format if you are not ending interview (do not end it soon ask for code and help user to get answer) using the key next_question only.

if not ending then include all below things in concise way
- Start with positive reinforcement, highlighting any correct or thoughtful aspects of their approach.
- If the solution is incorrect or incomplete, provide a clear hint or guidance to help them move forward.
- Prompt the user with a question like: "What could you do to optimize this further?" or "How would you handle edge cases for this solution?"
- Maintain a tone that is professional yet encouraging, ensuring the user feels supported in their learning journey

If you are ending the interview just put the feedback key, correctness key that will have the correctness of interview in number (percentage out of 100)  and also the key with end which will have true in the json format only.

Follow this structured approach:

1. Evaluate the user's response:
   - If the user provides a brute-force approach, acknowledge their effort and then:
     a. Ask them to identify potential inefficiencies in their solution.
     b. Prompt them to improve their approach, gradually guiding them toward an optimal solution.
   - If the user struggles or their solution is incorrect:
     a. Politely point out the issue and offer a hint to nudge them in the right direction.
     b. Provide step-by-step guidance if asked by the user, while encouraging them to solve the problem independently.
4. As the conversation progresses, ask increasingly refined and challenging questions, ensuring the user thinks critically about optimizations, edge cases, and scalability.
6. Avoid overwhelming the user with too much information keep your questions small at once—guide them one step at a time ask for space nd time complexity of optimal solution.
7. if you are satisfied or user is not able to solve the question even after your help then End the interaction with a summary of their areas for improvement, motivating them to continue honing their skills and if they are unable to solve tell them.

. 
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
    cuurInterview.answers.push(answer)
    user.freeInterview += 1
    await user.save()
  }

  await cuurInterview.save();

  res.status(200).json({ question: finalJson });
  } catch (error) {
    res.status(400).json({message:"Internal Server Error"})
    console.log(error);
    
  }
  
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const verifedEmail = await User.findOne({ email: email });
    // console.log(verifedEmail);
    res.json({messsage: "user Verified start Practising Leetcode "})
  } catch (error) {
    // console.log(error);
    res.json({messsage: error})
  }
};
