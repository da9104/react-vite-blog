import { useState, useEffect, useRef } from 'react'
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import './ChatPage.css'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);
  
      useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
      }, [socket, messages]);

      useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data))
      }, [socket]);
    

  return (
      <div className='bg-white shadow-md rounded-lg max-w-lg w-full'>
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody 
        messages={messages} 
        lastMessageRef={lastMessageRef} 
        typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
        </div>
      </div>
  );
};

export default ChatPage;