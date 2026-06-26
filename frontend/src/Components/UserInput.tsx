import React from 'react';

interface UserInputProps{
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (buttonText?:string) => void;
}

const UserInput = ({input,setInput,sendMessage}:UserInputProps) =>{
    return(
        <div className="user-input">
            <div className="input-group">
                <input
                  type ="text"
                  className ="form-control"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Enter your message here......"
                />

                <button OnClick={() => sendMessage()}>
                    Send
                </button>
            </div>
        </div>
    );       
};

export default UserInput;