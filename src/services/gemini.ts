import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askTutor(question: string, context: string) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are an expert tutor on ISQM 2 (International Standard on Quality Management 2).
        A student is asking a question based on this lesson content:
        ---
        ${context}
        ---
        
        Student Question: ${question}
        
        Instructions:
        1. Provide the answer in English.
        2. Then, provide the same answer translated into Amharic.
        3. Keep the tone professional, educational, and encouraging.
        4. If the question is not about ISQM 2 or auditing context, politely redirect them back to the topic in both languages.
      `
    });
    
    return result.text || "I couldn't generate a response. / ምላሽ መስጠት አልቻልኩም።";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later. / አሁን ከእኔ ጋር መገናኘት አልቻልኩም። እባክዎ ቆይተው እንደገና ይሞክሩ።";
  }
}
