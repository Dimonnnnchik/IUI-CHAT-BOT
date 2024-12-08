import { State } from "../../reducer_api/state"
import { useChatbot } from "../../chatbot/useChatbot"
import { Messages } from "./messages/Messages"
import { Options } from "./options/Options"
import { Form } from "./form/Form"
import React, {useEffect, useRef, useState} from "react"


import "./frame.css"

export const Frame = () => {
    const { chatbotState, chatbotDispatch } = State()
    const [key, setKey] = useState(0);

    const triggerRefresh = () => {
        setKey(prevKey => prevKey + 1);
    };

    const {
        handleOptionClick,
        handleMessageSubmit
    } = useChatbot(
        chatbotState,
        chatbotDispatch
    )

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger scroll when messages prop changes
  useEffect(() => {
    scrollToBottom();
  }, [chatbotState]);


  const [isBotConversation, setIsBotConversation] = useState(false)

    useEffect(() => {
        setIsBotConversation(chatbotState.AI === true)
    }, [chatbotState.AI]) // Re-run the effect whenever chatbotState.AI changes



    return (
        <div className="frame">
            {/* Force re-rendering of Messages by using a dynamic key */}
            <Messages key={key} messages={chatbotState.messages} />

            {/* Show Options component only if it's not a bot conversation */}
            {!isBotConversation && (
                <Options
                    key="options" // Ensure re-rendering when switching
                    options={chatbotState.options}
                    handleOptionClick={handleOptionClick}
                />
            )}

            {/* Show Form component if it's a bot conversation */}
            {isBotConversation && (
                <Form
                    key="form" // Ensure re-rendering when switching
                    handleMessageSubmit={handleMessageSubmit}
                    onAdd={triggerRefresh}
                />
            )}

          <div ref={messagesEndRef} />
        </div>
    )
}
