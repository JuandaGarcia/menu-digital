import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Notiflix from 'notiflix'
import '../assets/css/components/MenuItem.css'

const MenuItem = ({ id, name, price, description, addToCart }) => {
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		Notiflix.Notify.Init({ position: 'right-bottom' })
	}, [])

	const handleClick = () => {
		const newItem = {
			id,
			name,
			description,
			price,
			cantidad: 1,
		}
		addToCart(newItem)
		Notiflix.Notify.Success(`Se añadio ${name} al carrito.`)
		setOpenModal(false)
	}

	return (
		<>
			{openModal && (
				<Modal closeModal={(value) => setOpenModal(value)}>
					<h2>{name}</h2>
					<p>{description}</p>
					<p>
						<strong>$ {price}</strong>
					</p>
					<input
						onClick={handleClick}
						type="submit"
						className="modal__container__button newfoodForm"
						value="Añadir al carrito"
					/>
				</Modal>
			)}
			<div onClick={() => setOpenModal(true)} className="menu__item">
				<div className="menu__item__circle">
					<img
						className="menu__item__circle__img"
						src="/img/food/food.jpg"
						alt="Pizza"
					/>
				</div>
				<div className="menu__item__content">
					<h3>{name}</h3>
					<br />
					<p>{description}</p>
					<br />
					<p>
						<strong>$ {price}</strong>
					</p>
				</div>
			</div>
		</>
	)
}

export default MenuItem
