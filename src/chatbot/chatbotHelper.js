import data from "../data.json";
import { generateAIMessage } from "./aiService";

export const handleOptionClick = (chatbotStates, op) => {
    const botRes = data[op.res_id];

    // Reset the page if the user selects an option that triggers a page reload
    if (op.res_id === -1) {
        window.location.reload();
    } else {
        // If the response is the first one, just show the bot's initial message
        if (op.res_id === 0) {
            chatbotStates.messages = [{ msg: botRes.res, type: "bot" }];
        } else {
            // If the response has options, display both the sender's message and the bot's response
            chatbotStates.messages.push({ msg: op.label, type: "sender" }, { msg: botRes.res, type: "bot" });
        }
    }

    // Check if res_id is 19, and update AI state accordingly
    if (op.res_id === 19) {
        chatbotStates.messages = [];
        chatbotStates.messages = [{ msg: botRes.res, type: "bot" }];
        chatbotStates.AI = true; // Set AI to true when res_id is 19
    } else {
        chatbotStates.AI = false; // Otherwise, set AI to false
    }

    // Update options for the next set of user choices
    chatbotStates.options = data[op.res_id].options;

    return chatbotStates;
};


export const handleMessageSubmit = (chatbotStates, msg, triggerRefresh) => {
    // Encapsulate the sender's message
    const userMessage = { msg, type: "sender" };
    chatbotStates.messages.push(userMessage);

    // Limit to the last 6 messages
    if (chatbotStates.messages.length > 12) {
        chatbotStates.messages = chatbotStates.messages.slice(chatbotStates.messages.length - 12); // Keep the last 6 bot and sender messages
    }

    if (chatbotStates.AI) {
        console.log("Waiting for AI response...");

        
        const lastMessages = chatbotStates.messages.slice(-10); 
        const userLog = lastMessages.map(message => `${message.type === "bot" ? "Bot" : "Sender"}: ${message.msg}`).join("\n");
        console.log(userLog)
        // Simulate calling the AI service
        generateAIMessage(userLog, msg).then(aiResponse => {
            const botMessage = { msg: aiResponse, type: "bot" };
            chatbotStates.messages.push(botMessage);
            console.log("AI Response:", botMessage);

            // Trigger refresh after the AI response is added to the chatbot state
            triggerRefresh();  // This will increment the key in the parent Frame component

            // Force update of the chatbot state
            chatbotStates = { ...chatbotStates };

            return chatbotStates;
        }).catch(error => {
            console.error("Error generating AI response:", error);
            chatbotStates.messages.push({ msg: "Error generating response. Please try again.", type: "bot" });
            chatbotStates = { ...chatbotStates };
        });
    }

    return chatbotStates;
};


export const handleChangeBot = (chatbotStates, bot) => {
    chatbotStates.bot = bot;
    return chatbotStates;
};