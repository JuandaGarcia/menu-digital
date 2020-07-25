import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/css/components/Modal.css'

const Modal = ({
	children,
	closeModal,
	setTemporalFoodEdit,
	isMiMenu,
	isOrders,
	setDeleteOrder,
	pequeño,
}) => {
	return ReactDOM.createPortal(
		<div className={`modal ${pequeño && 'pequeño'}`}>
			<div
				onClick={() => {
					closeModal(false)
					if (isMiMenu) {
						setTemporalFoodEdit('')
					}
					if (isOrders) {
						setDeleteOrder('')
					}
				}}
				className="modal__exitBackground"
			></div>
			<div className="modal__container">
				<button
					onClick={() => {
						closeModal(false)
						if (isMiMenu) {
							setTemporalFoodEdit('')
						}
						if (isOrders) {
							setDeleteOrder('')
						}
					}}
					className="modal__container__exit"
				></button>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	)
}

export default Modal
