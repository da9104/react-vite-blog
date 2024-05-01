import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../context/userContext"

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const [isTyping, setIsTyping] = useState(false); 
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true); // Set typing status to false after a delay
    }, 1000);
    return () => clearTimeout(timeout); // Cleanup function to clear timeout on unmount
  }, []);

  return (
    <>
      <div className="message__container">
        {messages.map((message) =>
          message.name === currentUser?.firstName ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender" ref={lastMessageRef}>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient" ref={lastMessageRef}>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status" >
          <p>{isTyping ? typingStatus : ''}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;