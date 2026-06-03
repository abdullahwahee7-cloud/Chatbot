import { Button } from 'bootstrap';
import React, { useState, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

interface message {
    sender: 'user' | 'chatbot';
    text: string;
    time: string; 
}
const App: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]); // The setMessages is the function used to update the messages
    const [input, setInput] = useState(''); 
    const [ws, setWs] = useState<WebSocket | null>(null); // This is used to build a connection between backend and frontend, So it can be smooth 
    const messagesEnd = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080'); // This is used for a WebSocket connection 

        socket.onopen = () => {
            setMessages([{
                sender: 'chatbot',
                text: "Hello, Welcome to Deggendorf information bot, How can I helo you?",
                time: new Date().toLocaleDateString()
            }]);
        };
        socket.onmessage = (event) => {
            const chatbotReply = JSON.parse(event.data);
            setMessages(prev => [...prev,chatbotReply]); // Used for taking the existing messages and add the new messages at the end and then update it 
        };

        setWs(socket);

        return () => socket.close();
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !ws) return;

        const userMessage = {
            sender: 'user',
            text: input.trim(),
            time: new Date().toLocaleDateString()
        };

        setMessages(prev => [...prev,userMessage]);
        ws.send(input.trim());
        setInput('');
    };
    
    return (
        <div className="container-fluid vh-100 bg-light p-0">
            <div className="row h-100">
                <div className="col-12 bg-dark text-white p-3 text-center">
                    <h4> Deggendorf ChatBot </h4>
                </div>
                
                <div className="col-12 p-3" style={{height: '75vh', overflowY: 'auto' }}>
                    {messages.map((msg,index) => (   // it takes every messages in the array and then show as a chat bubble 
                        <div key={index} className="mb-3">
                            <div className={`p-3 rounded ${msg.sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-white border'}`}
                                 style={{ maxWidth: '70%', width: 'fit-content'}}>
                             <small>{msg.time}</small><br />
                             {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEnd} />
                </div>

                {/* Input Area */}
        <div className="col-12 p-3 bg-white border-top">
          <div className="input-group">
            <input 
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Listens to keyboard input 
              placeholder="Type your message..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;