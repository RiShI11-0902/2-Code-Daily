require('dotenv').config()
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  exports.chatSession = model.startChat({
    generationConfig,
  });
//   async function run() {
  
//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());
//   }
  
//   run();