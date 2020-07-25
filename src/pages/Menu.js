import React, { useEffect, useState } from 'react'
import MenuItem from '../components/MenuItem'
import { database } from '../firebaseConfig'
import { Link } from 'react-router-dom'
import Notiflix from 'notiflix'
import NotFound from './NotFound'
import Modal from '../components/Modal'
import FinDelPedido from '../components/FinDelPedido'
import '../assets/css/pages/Home.css'

const Menu = ({ match }) => {
	const id = match.params.id
	const [active, setActive] = useState(false)
	const [noMenu, setNoMenu] = useState(false)
	const [food, setFood] = useState([])
	const [carrito, setCarrito] = useState([])
	const [carritoNumber, setCarritoNumber] = useState(0)
	const [openModal, setOpenModal] = useState(false)
	const [MesaUsuario, setMesaUsuario] = useState('')
	const [SuccessfulOrder, setSuccessfulOrder] = useState(false)
	const [Observaciones, setObservaciones] = useState('')

	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		document.title = 'Delimenú - Menú'
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

	const deleteProductToCart = (id) => {
		const carritoTemporal = carrito
		const index = carrito.findIndex((item) => item.id === id)
		setCarritoNumber(carritoNumber - carrito[index].cantidad)
		carritoTemporal.splice(index, 1)
		setCarrito(carritoTemporal)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!carrito.length) {
			Notiflix.Notify.Warning('No tienes productos en el carrito')
		} else {
			document
				.querySelectorAll('.menuForm')
				.forEach((input) => (input.disabled = true))
			try {
				const NuevoPedido = {
					idUser: id,
					products: [...carrito],
					mesa: MesaUsuario,
					observaciones: Observaciones,
					total: carritoTotal(),
				}
				await database.collection('pedidos').doc().set(NuevoPedido)
				Notiflix.Notify.Success('El pedido se realizo correctamente.')
				setSuccessfulOrder(true)
			} catch (error) {
				Notiflix.Notify.Failure('Algo salió mal. Por favor inténtalo de nuevo.')
				setOpenModal(false)
			}
			document
				.querySelectorAll('.menuForm')
				.forEach((input) => (input.disabled = false))
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

	const carritoTotal = () => {
		let total = 0
		carrito.forEach((food) => {
			total += food.price * food.cantidad
		})
		return total
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

	if (SuccessfulOrder) {
		return <FinDelPedido />
	}

	if (active) {
		return (
			<>
				{openModal && (
					<Modal closeModal={(value) => setOpenModal(value)} pequeño>
						<div className="carrito-row">
							<h4>Producto</h4>
							<h4>Precio</h4>
							<h4>Cantidad</h4>
							<h4>Eliminar</h4>
						</div>
						{!carrito.length && (
							<div className="no-products">
								Aun no hay productos en el carrito
							</div>
						)}
						{carrito.map((food) => {
							return (
								<div key={food.id} className="carrito-row">
									<span>{food.name}</span>
									<span>$ {food.price}</span>
									<span>{food.cantidad}</span>
									<button
										className="delete-product-cart"
										onClick={() => deleteProductToCart(food.id)}
									>
										x
									</button>
								</div>
							)
						})}
						<form className="formulario-pedido" onSubmit={handleSubmit}>
							<div className="carrito-total">
								<label>
									Mesa en la que te encuentras:
									<input
										className="input-mesa menuForm"
										required
										value={MesaUsuario}
										onChange={(e) => setMesaUsuario(e.target.value)}
										type="number"
									/>
								</label>
							</div>
							<div className="carrito-total observaciones">
								<h4>Observaciones</h4>
								<textarea
									className="observaciones__textarea"
									onChange={(e) => setObservaciones(e.target.value)}
									placeholder="Hamburguesa sin cebolla..."
									type="text"
								/>
							</div>
							<div className="carrito-total">
								<p>
									<strong>Total: ${carritoTotal()}</strong>
								</p>
							</div>
							<input
								type="submit"
								className="modal__container__button menuForm"
								value="Realizar pedido"
							/>
						</form>
					</Modal>
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
