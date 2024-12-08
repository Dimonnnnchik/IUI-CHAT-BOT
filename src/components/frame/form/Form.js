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
        <input ref={msg} type="text" placeholder="Type a message" />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="#fdf8f6" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};