import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from './Components/Header';
// import MessageArea from './Components/MessageArea';
// import UserInput from './Components/UserInput';
import { Message } from './Components/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// comments are added so the other teammates can understand who were doing backend


const MessageBubble = ({ msg }: { msg: Message }) => {
    return (
        <div className="mb-3">
            <div
                className={`p-2 rounded chat-message ${msg.sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-white border'}`}
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


// Taha's part

const MessageArea = ({ messages, messagesEnd }: { messages: Message[], messagesEnd: React.RefObject<HTMLDivElement | null> }) => {
    return (
        //<div className="col-12 p-3" style={{height: '75vh', overflowY: 'auto' }}>
        <div className ='message-area'>
            {messages.map((msg: Message, index: number) => (
                <MessageBubble key={index} msg={msg} />
            ))}
            <div ref={messagesEnd} />
        </div>
    );
};

// Abdullah's part



interface UserInputProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (buttonText?: string) => void;
}


const UserInput = ({ input, setInput, sendMessage }: UserInputProps) => {
  return (
    //<div className="col-12 p-3 bg-white border-top">
    <div className ='user-input'>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Enter your message here..."
        />
        <button onClick={() => sendMessage()}>
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
        messagesEnd.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

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



    const sendMessage = (buttonText?: string) => {
        const messageText = buttonText || input.trim();
        
        if (!messageText|| !socket) return;

        const userMessage: Message = {
            sender: 'user',
            text: messageText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };

        setMessages(prev => [...prev,userMessage]);
        socket.emit('chat message', messageText);
        setInput('');
    };
    
    return (
       /* <div className="container-fluid vh-100 bg-light p-0">
            <div className="row h-100">*/
          <div className = 'page-background'>

            <div className="side-panel">
              <h5>Quick Topics</h5>
              <button onClick={() => sendMessage('Basic Information')}>ℹ️ Information about Deggendorf</button>
              <button onClick={() => sendMessage('transportation')}>🚆 Transportation</button>
              <button onClick={() => sendMessage('weather')}>🌤 Weather</button>
              <button onClick={() => sendMessage('healthcare in Deggendorf')}>🏥 Healthcare</button>
              <button onClick={() => sendMessage('student accommodation in Deggendorf')}>🏠 Accommodation</button>
              <button onClick={() => sendMessage('restaurants in Deggendorf')}>🍽 Restaurants</button>
              <button onClick={() => sendMessage('Introduce THD')}>🎓 THD</button>
              <button onClick={() => sendMessage('activities in Deggendorf')}>🎉 Activities</button>
            </div>

            <div className = 'chat-container'>
                <Header
                   messages={messages}
                   setMessages={setMessages}
                   setInput={setInput}
                />

                <MessageArea messages={messages} messagesEnd={messagesEnd} />

      <UserInput input={input} setInput={setInput} sendMessage={sendMessage} />

      </div>

      <div className="side-panel">
      <h5>Popular Questions</h5>
      <button onClick={() => sendMessage('Tell me about THD')}>Introduce THD?</button>
      <button onClick={() => sendMessage('Who is Mayor of Deggendorf?')}>Who is Mayor of Deggendorf?</button>
      <button onClick={() => sendMessage('How do I get to Deggendorf?')}>How do I get to Deggendorf?</button>
      <button onClick={() => sendMessage('Where can I find accommodation?')}> Where can I find accommodation?</button>
      <button onClick={() => sendMessage('What are the activities in Deggendorf?')}>What are the activity in Deggendorf?</button>
      <button onClick={() => sendMessage('Where can I eat?')}>Where can I eat?</button>
      <button onClick={() => sendMessage('Emergency numbers')}>Emergency numbers?</button>
      </div> 

    </div>

  );
};

export default App;