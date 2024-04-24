import { useState } from 'react'

export default function Modal({ isConnected }) {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
		setShowModal(false)
	}	

	const handleOpen = () => {
		setShowModal(true)
	}

    return (
      <div className="modal-overlay">
        <div className="modal-content">
        {showModal && <div className="z-40 absolute inset-0 bg-gray-100 w-full">
           <button onClick={ handleClose }> close modal contents </button>
           <p>State: { '' + isConnected }</p>
        </div> }
          <button className="absoulte" onClick={ handleOpen }>Open</button>
        </div>
      </div>
      );
    }