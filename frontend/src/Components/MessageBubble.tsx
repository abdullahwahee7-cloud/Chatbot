import React from 'react';
import { Message } from '../types';

interface Props {
    msg: Message
}

const MessageBubble = (props:Props) => {

    let bubbleClass = "bot-message"
    if (props.msg.sender === 'user') {
        bubbleClass = "user-message"
    } 

    return (
        <div className="message-row">
            <div className={`chat-message ${bubbleClass}`}>
                <small className="message-time">{props.msg.time}</small>
                <br />
                {props.msg.text}
            </div>
        </div>
    )
}

export default MessageBubble;