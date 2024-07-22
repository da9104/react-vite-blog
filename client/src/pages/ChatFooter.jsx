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
    <div className="">
      <form className="p-2 border-t flex" onSubmit={handleSendMessage}>
        <input
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;