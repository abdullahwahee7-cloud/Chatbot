import React from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';

interface Props {
    messages: Message[];
    messagesEnd: React.RefObject<HTMLDivElement | null>;
}

const MessageArea = (props : Props) => {
    return (
        <div className="message-area">
            {props.messages.map((msg: Message, index: number) => {
                return <MessageBubble key={index} msg={msg} />
            })}
            <div ref={props.messagesEnd} />
        </div>
    );
};

export default MessageArea;