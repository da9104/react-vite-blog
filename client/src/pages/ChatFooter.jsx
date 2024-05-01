import { useState, useContext } from 'react';
import { UserContext } from "../context/userContext"

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');
  const { currentUser } = useContext(UserContext);

  const handleTyping = () => socket.emit('typing', `${currentUser?.firstName} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('user')) {
        socket.emit('message', {
          text: message,
          name: `${currentUser?.firstName}`,
          id: `${currentUser?.id}`,
          socketID: socket.id,
        });
      }
      setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="chat__form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type='submit' className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;