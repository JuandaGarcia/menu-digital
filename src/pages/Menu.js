import React, { useEffect, useState } from 'react'
import MenuItem from '../components/MenuItem'
import { database } from '../firebaseConfig'
import Notiflix from 'notiflix'
import '../assets/css/pages/Home.css'
import NotFound from './NotFound'

const Menu = ({ match }) => {
	const id = match.params.id
	const [active, setActive] = useState(false)
	const [noMenu, setNoMenu] = useState(false)
	const [food, setFood] = useState([])

	useEffect(() => {
		getMenuState()
	}, [])

	const getFood = async () => {
		const foods = []
		const response = await database
			.collection('foods')
			.where('idUser', '==', id)
			.get()

		response.forEach((doc) => {
			foods.push({ ...doc.data(), id: doc.id })
		})
		setFood(foods)
	}

	const getMenuState = async () => {
		const menus = []
		try {
			const response = await database
				.collection('menus')
				.where('idUser', '==', id)
				.get()

			response.forEach((doc) => {
				menus.push({ ...doc.data(), id: doc.id })
			})
		} catch (error) {
			Notiflix.Notify.Failure('Algo salió mal.')
		}
		if (menus.length) {
			setActive(true)
			getFood()
		} else {
			setNoMenu(true)
		}
	}

	if (noMenu) {
		return <NotFound />
	}

	if (active) {
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
	return null
}

export default Menu
