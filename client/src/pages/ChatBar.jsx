import { useState, useEffect } from 'react';

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket]);

  return (
    <div className="chat__sidebar">
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
        {users.map((user) => (
            <p key={user.socketID}>{user.socketID}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;