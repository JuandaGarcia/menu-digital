import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/components/FinDelPedido.css'

const FinDelPedido = () => {
	return (
		<div className="succesful-order">
			<img
				className="succesful-order__image"
				src="/img/illustrations/order.png"
				alt="Pedido"
			/>
			<h1>Tu pedido se realizó satisfactoriamente {'😄'}</h1>
			<br />
			<p>En unos minutos llegara tu comida a la mesa.</p>
			<Link className="landing__button__main landing__button" to="/">
				<span>Ir al inicio</span>
				<img
					className="landing__button--img"
					src="/img/icons/arrow-right.svg"
					alt="→"
				/>
			</Link>
		</div>
	)
}

export default FinDelPedido
