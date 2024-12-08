

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBhU-ms-8phLdKcrAQ_5OeZi-z8U15HbLA";

export const generateAIMessage = async (userLog, currentMessage) => {
    try {
        // Initialize Google Generative AI with API key
        const genAI = new GoogleGenerativeAI(API_KEY);

        // Use a specific model (e.g., gemini-1.5-flash)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Define your prompt with the last 6 messages and the current user message
        const promptForCreation = `You are a good psychological doctor. Respond to the following user input and help them. The conversation so far is:\n${userLog}\nNow, respond to the new input: "${currentMessage}". Restrict your message to 200-350 characters.`;

        // Call the API to generate content
        const result = await model.generateContent(promptForCreation);

        // Extract content from the API response
        const content = result.response.text();

        // Return the content directly as a string
        return content.trim();
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate AI response");
    }
};