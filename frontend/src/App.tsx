import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from './Components/Header';
import MessageArea from './Components/MessageArea';
import UserInput from './Components/UserInput';
import { Message } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// comments are added so the other teammates can understand who were doing backend


// Abdullah's part



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
        let socketUrl = ''
        if(window.location.hostname === 'localhost'){
            socketUrl = 'http://localhost:8080'
        } else {
            socketUrl = window.location.origin
        }

        let newSocket = io(socketUrl, {
            transports: ['websocket']
        });

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
        let messageText = buttonText || input.trim();
        let userMessage: Message;
        
        if (!messageText|| !socket) {
            return
        } else {
            userMessage = {
            sender: 'user',
            text: messageText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
           };
        }

        setMessages(prev => [...prev,userMessage]);
        socket.emit('chat message', messageText);
        setInput('');
    };
    
    return (
       /* <div className="container-fluid vh-100 bg-light p-0">
            <div className="row h-100">*/
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
         socket={socket}
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