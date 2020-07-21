import React from 'react'
import '../assets/css/components/MenuItem.css'
import { Link } from 'react-router-dom'

const MenuItem = () => {
	return (
		<Link to="/" className="menu__item">
			<div className="menu__item__circle">
				<img
					className="menu__item__circle__img"
					src="/img/food/pizza1.png"
					alt="Pizza"
				/>
			</div>
			<div className="menu__item__content">
				<h3>Deluxe Veggie</h3>
				<br />
				<p>Lorem ipsum dolor sit amet.</p>
				<br />
				<p>
					<strong>$ 26.000</strong>
				</p>
			</div>
		</Link>
	)
}

export default MenuItem
