import { useRef } from "react";

export const Form = (props) => {
  const msg = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = msg.current.value.trim();
    if (trimmedValue) {
        // Pass triggerRefresh to handleMessageSubmit
        props.handleMessageSubmit(trimmedValue, props.onAdd);  // onAdd is triggerRefresh
        msg.current.value = ""; // Clear input after submission
    }
  };

  return (
    <div className="send-msg">
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={msg} type="text" placeholder="Type a message"/>
          <button>
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.036 13.2207H12.0353" stroke="#9398A7" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M26.036 13.2207L8.85333 21.4939L12.0353 13.2207L8.85333 4.94757L26.036 13.2207Z" stroke="#9398A7"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

      </form>
    </div>
  );
};
