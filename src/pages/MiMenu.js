import React, { useContext, useEffect, useState } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import Modal from '../components/Modal'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MiMenu.css'

const MiMenu = () => {
	const { currentUser } = useContext(AuthContext)
	const [openModal, setOpenModal] = useState(false)
	console.log(currentUser)
	useEffect(() => {
		document.title = 'Delimenú - Mi menú'
	}, [])

	if (currentUser) {
		return (
			<UserPanelLayout
				isMiMenu
				title="Mi menú"
				openModal={(value) => setOpenModal(value)}
			>
				{openModal && (
					<Modal closeModal={(value) => setOpenModal(value)}>
						<p>Nombre de la sección</p>
						<input
							placeholder="Bebidas, Postres, Aperitivos..."
							type="text"
							className="input-modal__new-section"
						/>
						<button className="modal__container__button">Crear sección</button>
					</Modal>
				)}
				<section className="mi-menu__container">
					<label className="mi-menu__container__label">
						<input
							className="mi-menu__container__input"
							placeholder="Nombre del menú..."
							type="text"
						/>
					</label>
					<a
						href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${window.location.origin.toString()}/menu/${
							currentUser.uid
						}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						s
					</a>
					<div className="mi-menu__no-sections">
						<span>Todavía no tienes secciones</span>
					</div>
				</section>
			</UserPanelLayout>
		)
	}
	return <Redirect to="/" />
}

export default MiMenu
