import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/css/components/Modal.css'

const Modal = ({ children, closeModal }) => {
	return ReactDOM.createPortal(
		<div className="modal">
			<div
				onClick={() => closeModal(false)}
				className="modal__exitBackground"
			></div>
			<div className="modal__container">
				<button
					onClick={() => closeModal(false)}
					className="modal__container__exit"
				></button>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	)
}

export default Modal
