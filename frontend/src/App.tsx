import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from './Components/Header';
import MessageArea from './Components/MessageArea';
// import UserInput from './Components/UserInput';
import { Message } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// comments are added so the other teammates can understand who were doing backend


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
        <button 
         className='send-button'
         onClick={() => sendMessage()}>
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
    const socketUrl =
    window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : window.location.origin;

    const newSocket = io(socketUrl, {
    transports: ['polling']});

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
//Cheng update button to select menu



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
          <div className="page-background">

            <div className="sidebar">

             <div className="side-panel">
              <h5>Quick Topics</h5>
              <select
                 defaultValue=""
                 onChange={(e) => {
                 sendMessage(e.target.value);
                e.target.value = "";
              }}
             >
               <option value="" disabled>
                   Choose a Topics
               </option>
               <option value="Basic Information">ℹ️ Deggendorf Info</option>
               <option value="Transportation">🚆 Transportation</option>
               <option value="Weather">🌤 Weather</option>
               <option value="Healthcare in Deggendorf">🏥 Healthcare</option>
               <option value="Student accommodation in Deggendorf">🏠 Accommodation</option>
               <option value="Restaurants in Deggendorf">🍽 Restaurants</option>
               <option value="Introduce THD">🎓 THD</option>
               <option value="Activities in Deggendorf">🎉 Activities</option>
               </select>
           </div>

           <div className="side-panel">
            <h5>Popular Questions</h5>
            <select
                 defaultValue=""
                 onChange={(e) => {
                sendMessage(e.target.value);
                e.target.value = "";
              }}
             >
              <option value="" disabled>
                   Choose a Topics
              </option>
              <option value="Tell me about THD">Introduce THD?</option>
              <option value="Who is Mayor of Deggendorf?">Who is Mayor of Deggendorf?</option>
              <option value="How do I get to Deggendorf?">How do I get to Deggendorf?</option>
              <option value="Where can I find accommodation?">Where can I find accommodation?</option>
              <option value="What are the activities in Deggendorf?">What are the activity in Deggendorf?</option>
              <option value="Where can I eat?">Where can I eat?</option>
              <option value="Emergency numbers">Emergency numbers?</option>
            </select>
           </div>

       </div>

       <div className="chat-container">
        <Header
         messages={messages}
         setMessages={setMessages}
         setInput={setInput}
         />

        <MessageArea messages={messages} messagesEnd={messagesEnd} />

        <UserInput
           input={input}
           setInput={setInput}
           sendMessage={sendMessage}/>
     </div>

  </div>

  );
};

export default App;