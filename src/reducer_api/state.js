import { useReducer } from "react"
import { Reducer } from "./reducer"
import data from "../data.json"

export const State = () => {
    const InitialState = {
        messages: [{
            msg: data[0].res,
            type: "bot"
        }],
        options: data[0].options,
        AI: false 
    }

    const [chatbotState, chatbotDispatch] = useReducer(Reducer, InitialState)

    return { chatbotState, chatbotDispatch }
}
