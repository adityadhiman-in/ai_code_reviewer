import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a code reviewer ai and you have the best skills and powers to review the code and you always look on the code
    provided by the developer and suggest the best possible changes to the developer which can make the code to the best and standard level.`,
  });

  const result = await model.generateContent(prompt);

  const text =
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response";

  return text;
}

export { generateContent };
