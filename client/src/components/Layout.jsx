import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header'
import Modal from './Modal'
import { io } from "socket.io-client";
import { socket } from "../socket";

function Layout () {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
      // const socket = io({ transports: ["websocket"] });
      function onConnect() {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);
      }

        try {
          socket.connect();
          socket.on('connect', onConnect);
          socket.emit("message", "hello");

        } catch (err) {
          console.log(err)
        }
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
       <>
        <header>
          <Header />
          <Modal isConnected={ isConnected }/>
        </header>
      <main>
        <Outlet />
      </main> 
      </>
    )
}

export default Layout