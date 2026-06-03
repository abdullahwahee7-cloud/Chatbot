import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; I tried importing this but for some reason it becomes red

// comments are added so the other teammates can understand who were doing backend

interface message {
    sender: 'user' | 'chatbot';
    text: string;
    time: string; 
}

// Abdullah's part

const App: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]); // the setMessages is the function used to update the messages
    const [input, setInput] = useState(''); 
    const [ws, setWs] = useState<WebSocket | null>(null); // this is used to build a connection between backend and frontend, So it can be smooth 
    const messagesEnd = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080'); // this is used for a WebSocket connection, I used 8080 although 8000 was also an option

        socket.onopen = () => {
            setMessages([{
                sender: 'chatbot',
                text: "Hey. What's up? How can I help you with your Deggendorf Information?",
                time: new Date().toLocaleDateString()
            }]);
        };
        socket.onmessage = (event) => {
            try {
            const chatbotReply = JSON.parse(event.data);
            setMessages(prev => [...prev,chatbotReply]); // used for taking the existing messages and add the new messages at the end and then update it 
            } catch (error) {
             console.error("Error parsing message:", error, "Please fix this.");
            }
        };

        setWs(socket);

        return () => socket.close();
    }, []);


// Taha's part



    const sendMessage = () => {
        if (!input.trim() || !ws) return;

        const userMessage = {
            sender: 'user',
            text: input.trim(), 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // shows hour and minutes in 2 digits
        };

        setMessages(prev => [...prev,userMessage]);
        ws.send(input.trim());
        setInput('');
    };
    
    return (
        <div className="container-fluid vh-100 bg-light p-0">
            <div className="row h-100">
                <div className="col-12 bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                 <h4 className="mb-0">🏙️ Deggendorf ChatBot</h4>
                 
                 <button
                  className="btn btn-danger btn-sm"
                  onClick={() => { // when user clicks this button then this function runs
                    setMessages([{
                        sender: 'bot',
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
                // it creates a temporary download link
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
                
                <div className="col-12 p-3" style={{height: '75vh', overflowY: 'auto' }}>
                    {messages.map((msg,index) => (   // it takes every messages in the array and then show as a chat bubble 
                        <div key={index} className="mb-3">
                            <div className={`p-3 rounded ${msg.sender === 'user' ? 'bg-primary text-white ms-auto' : 'bg-white border'}`}
                                 style={{ maxWidth: '70%', width: 'fit-content'}}>
                             <small style={{ opacity: 0.65, fontSize: '0.8rem'}}> // adding timestamps, and make it 65% visible so it alligns and doesn't become bold
                                {msg.time}
                             </small><br />

                             {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEnd} />
                </div>



// Abdullah's part



        <div className="col-13 p-3 bg-white border-top">
          <div className="input-group">
            <input 
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Listens to keyboard input 
              placeholder="Enter your message here..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;