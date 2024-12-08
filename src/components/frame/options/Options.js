export const Options = props => {
    // Check if options array is not empty
    if (!props.options || props.options.length === 0) {
        return null; // Return nothing if options array is empty
    }

    return (
        <div className="options">
            <p>Options:</p>
            <ul>
                {props.options.map((op, index) => (
                    <li key={index}>
                        <button onClick={() => props.handleOptionClick(op)}>
                            {op.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
