import React from 'react';
import { Message } from '../types';
import { Socket } from 'socket.io-client';

interface HeaderProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    socket: Socket | null;
}

const Header: React.FC<HeaderProps> = ({ messages, setMessages, setInput, socket }) => {
    
        const resetChat = () => {
            setMessages([]);
            setInput('');
            socket?.emit('reset chat');
        
        };
        
        const exportChat = () => {
                    const json = JSON.stringify({ conversation: messages }, null, 2) 

                    const url = URL.createObjectURL(
                    new Blob([json], { type: "application/json" })
                    );

                    const a = document.createElement("a"); 
                    a.href = url;
                    a.download = "chat-history.json";
                    a.click(); 

                    URL.revokeObjectURL(url);
        };

        return (
        <div className="header">
            <button className="reset-button" onClick={resetChat}>
                Reset Chat
            </button>

            <h4 className="header-name">Deggendorf ChatBot</h4>

            <button className="export-button" onClick={exportChat}>
                Export JSON
            </button>
        </div>

    );
};

export default Header;