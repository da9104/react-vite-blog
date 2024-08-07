import { useState, useEffect } from 'react'
import ChatPage from '../pages/ChatPage'

export default function Modal({ socket, isConnected }) {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
		setShowModal(false)
    socket.disconnect();
	}	

	const handleOpen = () => {
		setShowModal(true)
    socket.connect();
	}

    return (
      <div className="modal-overlay">
        <div className="modal-content">
        {showModal && <div className="fixed bottom-16 right-4 z-40 inset-y-1 w-96 ">
         <div className='p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center'>
          <button 
          className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400" 
          onClick={handleClose}
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>  
         </button>
        </div>
           <ChatPage socket={socket} />
        </div> }

        <div className="fixed bottom-4 right-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg" onClick={ handleOpen }>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          </button>
          </div>

        </div>
      </div>
      );
    }