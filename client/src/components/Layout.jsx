import { useState, useEffect, useContext } from 'react'
import { Outlet } from "react-router-dom"
import { UserContext } from '../context/userContext';
import Header from './Header'
import Modal from './Modal'
import { socket } from "../socket"

function Layout () {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        try {
          socket.connect();
          socket.emit('newUser', { userName: `${currentUser?.firstName}`, socketID: socket.id });
        } catch (err) {
          console.log(err)
        }
    }, []);
  
    return (
       <>
        <header>
          <Header />
          { currentUser && <Modal socket={socket} isConnected={isConnected} />}
        </header>
      <main>
        <Outlet />
      </main> 
      </>
    )
}

export default Layout