import React, {useEffect, useRef} from "react";


export const Messages = ({ messages }) => {

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
  }, [messages]);


  return (
    <div className="messages">
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className={msg.type}>
            {msg.msg}
          </li>
        ))}

      </ul>
      <div ref={messagesEndRef}/>
    </div>
  );
};
