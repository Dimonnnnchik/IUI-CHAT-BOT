import * as actionType from "../reducer_api/actions"
import * as chatbotHelper from "./chatbotHelper"
export const useChatbot = (chatbotState, chatbotDispatch) => {
    const handleOptionClick = op => chatbotDispatch({
        type: actionType.UPDATE_STATE,
        payload: chatbotHelper.handleOptionClick(chatbotState, op)
    })

    const handleMessageSubmit = (msg, triggerRefresh) => chatbotDispatch({
        type: actionType.UPDATE_STATE,
        payload: chatbotHelper.handleMessageSubmit(chatbotState, msg, triggerRefresh)  
    })
    
    const handleChangeBot = bot => {
        chatbotDispatch({
            type: actionType.UPDATE_BOT,
            payload: {
                bot, 
                messages: chatbotState.messages,
                options: chatbotState.options,
                AI: chatbotState.AI 
            }
        })
    }

    return {
        handleOptionClick,
        handleMessageSubmit,
        handleChangeBot
    }
}
