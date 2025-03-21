import "../styles/Chat.css";

const Message = ({ sender, text }) => {
    return (
        <div className={`message ${sender === "Admin" ? "admin" : ""}`}>
            <strong>{sender}: </strong> {text}
        </div>
    );
};

export default Message;

