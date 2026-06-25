import React from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';

interface Props {
    messages: Message[];
    messagesEnd: React.RefObject<HTMLDivElement | null>;
}

const MessageArea = ({ messages, messagesEnd }: Props) => {
    return (
        <div className="message-area">
            {messages.map((msg: Message, index: number) => (
                <MessageBubble key={index} msg={msg} />
            ))}
            <div ref={messagesEnd} />
        </div>
    );
};

export default MessageArea;