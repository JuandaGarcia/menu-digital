import React, { useEffect, useState } from 'react'
import MenuItem from '../components/MenuItem'
import { database } from '../firebaseConfig'
import { Link } from 'react-router-dom'
import Notiflix from 'notiflix'
import NotFound from './NotFound'
import Modal from '../components/Modal'
import '../assets/css/pages/Home.css'

const Menu = ({ match }) => {
	const id = match.params.id
	const [active, setActive] = useState(false)
	const [noMenu, setNoMenu] = useState(false)
	const [food, setFood] = useState([])
	const [carrito, setCarrito] = useState([])
	const [carritoNumber, setCarritoNumber] = useState(0)
	const [openModal, setOpenModal] = useState(false)

	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		getMenuState()
	}, [])

	const getFood = async () => {
		const foods = []
		try {
			const response = await database
				.collection('foods')
				.where('idUser', '==', id)
				.get()

			response.forEach((doc) => {
				foods.push({ ...doc.data(), id: doc.id })
			})
			setFood(foods)
			setActive(true)
		} catch (error) {
			Notiflix.Notify.Failure(
				'Algo salió mal al traer los datos del menu. Por favor intentalo de nuevo'
			)
		}
	}

	const addToCart = (food) => {
		setCarritoNumber(carritoNumber + 1)
		if (carrito.some((item) => food.id === item.id)) {
			const index = carrito.findIndex((item) => item.id === food.id)
			const carritoTemporal = carrito
			carritoTemporal[index] = {
				...carrito[index],
				cantidad: carrito[index].cantidad + 1,
			}
			setCarrito(carritoTemporal)
		} else {
			setCarrito([...carrito, food])
		}
	}

	const handleChange = (e) => {
		const texto = e.target.value
		setTextoBusqueda(texto)

		const search = food.filter((food) => {
			return `${food.name}`.toLowerCase().includes(texto.toLowerCase())
		})

		setSearchResult(search)
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
			<>
				{openModal && (
					<Modal closeModal={(value) => setOpenModal(value)}></Modal>
				)}
				<div className="main-container">
					<header className="header">
						<Link className="header__logo__link" to="/">
							<img
								className="header__logo"
								src="/img/logos/delimenu-black.svg"
								alt="Logo"
							/>
						</Link>
						<input
							onChange={handleChange}
							className="header__input"
							type="text"
							placeholder="Buscar"
						/>
						<button
							onClick={() => setOpenModal(true)}
							className="header__button"
						>
							<div className="header__button__count">
								<span>{carritoNumber}</span>
							</div>
							<img
								className="header__button__img"
								src="/img/icons/shopping-cart.svg"
								alt="Shop Car"
							/>
						</button>
					</header>
					<div className="main-container__title">
						<h1 className="main-container__title__h1">Menú</h1>
					</div>
					{food.length === 0 ? (
						<div className="no-food">
							<p>Este menú aun no tiene comida.</p>
						</div>
					) : (
						<>
							{!textoBusqueda && (
								<section className="menu">
									{food.map((food) => {
										return (
											<MenuItem
												key={food.id}
												id={food.id}
												name={food.name}
												price={food.price}
												description={food.description}
												addToCart={(value) => addToCart(value)}
											/>
										)
									})}
								</section>
							)}
							{!searchResult.length && textoBusqueda && (
								<div className="no-food">
									<p>{`No se encontró: ${textoBusqueda}`}</p>
								</div>
							)}
							{searchResult.length && textoBusqueda && (
								<section className="menu">
									{searchResult.map((food) => {
										return (
											<MenuItem
												key={food.id}
												id={food.id}
												name={food.name}
												price={food.price}
												description={food.description}
												addToCart={(value) => addToCart(value)}
											/>
										)
									})}
								</section>
							)}
						</>
					)}
				</div>
			</>
		)
	}
	return (
		<div className="fullscreen-loader">
			<img
				className="fullscreen-loader__img"
				src="/img/logos/delimenu-green.svg"
				alt="Logo"
			/>
		</div>
	)
}

export default Menu
