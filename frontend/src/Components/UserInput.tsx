import React from 'react';

interface UserInputProps{
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (buttonText?:string) => void;
}

const UserInput = (props: UserInputProps) => {

    let handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            props.sendMessage()
            console.log("sending message")
            return
        } else {
            return
        }
    } 

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // props.setInput(e.target.value.trim())
        props.setInput(e.target.value)
    }
    

    return (
        <div className="user-input">
            <div className="input-group">
                <input
                  type ="text"
                  className ="form-control"
                  value={props.input}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  placeholder="Enter your message here......"
                />

                <button onClick={() => props.sendMessage()}>
                    Send
                </button>
            </div>
        </div>
    );       
};

export default UserInput;