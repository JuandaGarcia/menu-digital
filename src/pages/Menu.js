import React from 'react'
import MenuItem from '../components/MenuItem'
import '../assets/css/pages/Home.css'

const Menu = () => {
	return (
		<div className="main-container">
			<header className="header">
				<img className="header__logo" src="/img/logos/pizza.png" alt="Logo" />
				<input className="header__input" type="text" placeholder="Buscar" />
				<button className="header__button">
					<span className="header__button__count">0</span>
					<img
						className="header__button__img"
						src="/img/icons/box-cart.png"
						alt="Shop Car"
					/>
				</button>
			</header>
			<div className="main-container__title">
				<h1 className="main-container__title__h1">Menú</h1>
			</div>
			<div className="menu">
				<section className="menu__section">
					<h2>Pizzas</h2>
					<MenuItem />
					<MenuItem />
					<MenuItem />
					<MenuItem />
					<MenuItem />
					<MenuItem />
				</section>
				<section className="menu__section">
					<h2>Bebidas</h2>
					<MenuItem />
					<MenuItem />
				</section>
				<section className="menu__section">
					<h2>Bebidas</h2>
					<MenuItem />
					<MenuItem />
					<MenuItem />
					<MenuItem />
				</section>
			</div>
		</div>
	)
}

export default Menu
