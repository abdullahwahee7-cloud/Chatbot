import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

// comments are added so the other teammates can understand who were doing backend

interface Message {
    sender: 'user' | 'chatbot';
    text: string;
    time: string; 
}


const MessageBubble = ({ msg }: { msg: Message }) => {
    return (
        <div className="mb-3">
            <div
                className={`p-3 rounded ${msg.sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-white border'}`}
                style={{ maxWidth: '70%', width: 'fit-content'}}
            >
                <small style={{ opacity: 0.65, fontSize: '0.8rem' }}>
                    {msg.time}
                </small>
                <br />
                {msg.text}
            </div>
        </div>
    );
};


// Taha's part

const MessageArea = ({ messages, messagesEnd }: any) => {
    return (
        <div className="col-12 p-3" style={{height: '75vh', overflowY: 'auto' }}>
            {messages.map((msg: Message, index: number) => (
                <MessageBubble key={index} msg={msg} />
            ))}
            <div ref={messagesEnd} />
        </div>
    );
};

// Abdullah's part

const UserInput = ({ input, setInput, sendMessage }: any) => {
  return (
    <div className="col-12 p-3 bg-white border-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Enter your message here..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};



const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]); // used to update the messages.
    const [input, setInput] = useState(''); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const messagesEnd = useRef<HTMLDivElement>(null); 

    useEffect(() => {
    const newSocket = io('http://localhost:8080');

    newSocket.on('connect', () => {
        console.log('socket connected');
    });

    newSocket.on('chat message', (chatbotReply: Message) => {
        setMessages(prev => [...prev, chatbotReply]);
    });

    setSocket(newSocket);

    return () => {
        newSocket.disconnect();
    };
   }, []);


// Taha's part



    const sendMessage = () => {
        if (!input.trim() || !socket) return;

        const userMessage: Message = {
            sender: 'user',
            text: input.trim(), 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };

        setMessages(prev => [...prev,userMessage]);
        socket.emit('chat message', input.trim());
        setInput('');
    };
    
    return (
        <div className="container-fluid vh-100 bg-light p-0">
            <div className="row h-100">
                <Header
                messages = {messages}
                setMessages = {setMessages}
                setInput = {setInput}
                />

                <MessageArea messages={messages} messagesEnd={messagesEnd} />

      <UserInput input={input} setInput={setInput} sendMessage={sendMessage} />

      </div>
    </div>

  );
};

export default App;



