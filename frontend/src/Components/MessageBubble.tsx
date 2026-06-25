import { Message } from '../types';

const MessageBubble = ({ msg }: { msg: Message }) => {
    return (
        <div className="message-row">
            <div
                className={`chat-message ${
                    msg.sender === 'user'
                        ? 'user message'
                        : 'bot-message'
                }`}
            >
                <small className="message-time">
                    {msg.time}
                </small>
                <br />
                {msg.text}
            </div>
        </div>
    );
};

export default MessageBubble;