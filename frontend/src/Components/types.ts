export interface Message {
    sender: 'user' | 'chatbot';
    text: string;
    time: string;
}
