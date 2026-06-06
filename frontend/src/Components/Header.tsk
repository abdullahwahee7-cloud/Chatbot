import React from 'react';

interface Message {
    sender : 'user' | 'chatbot';
    text: string;
    time: string;
}


interface HeaderProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ messages, setMessages, setInput }) => {
    return (
        <div className="col-12 bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                 <h4 className="mb-0">Deggendorf ChatBot</h4>
                 
                 <button
                  className="btn btn-danger btn-sm"
                  onClick={() => { // when user clicks this button then this function runs
                    setMessages([{
                        sender: 'chatbot',
                        text: "The chat has been reset. Hello again, how can I help you?", // This resets the message and opens a new chat which user can start a new convo
                        time: new Date().toLocaleDateString()
                    }]);
                    setInput('')

                  }}
                > Reset Chat
                </button>

                <button 
                 className="btn btn-success btn-sn"
                 onClick={() => {
                    const json = JSON.stringify({ conversation: messages }, null, 2) // with an indention space of 2, so it can be presented well

                    const url = URL.createObjectURL(
                    new Blob([json], { type: "application/json" })
                );

                    const a = document.createElement("a"); // link element 
                    a.href = url;
                    a.download = "chat-history.json";
                    a.click(); // browser downloads JSON for te user
                 }}
                 style={{ padding: '7px 16px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}
               >
                Export JSON
               </button>

            </div>

    );
};

export default Header;