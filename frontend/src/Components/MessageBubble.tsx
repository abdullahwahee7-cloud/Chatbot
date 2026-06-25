import { Message } from '../types';

const MessageBubble = ({ msg }: { msg: Message }) => {
    return (
        <div className="mb-3">
            <div
                className={`p-2 rounded chat-message ${
                    msg.sender === 'user'
                        ? 'bg-primary text-white ms-auto'
                        : 'bg-white border'
                }`}
            >
                <small style={{ opacity: 0.45, fontSize: '0.65rem' }}>
                    {msg.time}
                </small>
                <br />
                {msg.text}
            </div>
        </div>
    );
};

export default MessageBubble;