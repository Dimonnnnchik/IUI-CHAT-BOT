import * as appActionType from "./actions"

export const Reducer = (state, action) => {
    switch (action.type) {
        case appActionType.UPDATE_STATE:
            return {
                messages: action.payload.messages,
                options: action.payload.options,
                AI: action.payload.AI
            }

        case appActionType.UPDATE_BOT:
            return {
                ...state,
                AI: action.payload.AI 
            }

        case appActionType.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        default:
            return state
    }
}
