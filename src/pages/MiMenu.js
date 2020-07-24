import React, { useContext, useEffect, useState } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import { database } from '../firebaseConfig'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MiMenu.css'

const MiMenu = () => {
	const { currentUser } = useContext(AuthContext)
	const [openModal, setOpenModal] = useState(false)
	const [NewFood, setNewFood] = useState('')
	const [foods, setfoods] = useState([])
	const [temporalFoodRemove, setTemporalFoodRemove] = useState('')
	const [ModalDelete, setModalDelete] = useState(false)
	const [loaders, setLoaders] = useState({
		foodsLoader: true,
	})

	useEffect(() => {
		document.title = 'Delimenú - Mi menú'
		getfoods()
	}, [])

	const handleInput = (event) => {
		setNewFood({
			...NewFood,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		document
			.querySelectorAll('.newfoodForm')
			.forEach((input) => (input.disabled = true))

		await addfood()

		document
			.querySelectorAll('.newfoodForm')
			.forEach((input) => (input.disabled = true))
		setOpenModal(false)
	}

	const onDeleteFood = (id) => {
		setTemporalFoodRemove(id)
		setModalDelete(true)
	}

	const confirmDeleteFood = async () => {
		setModalDelete(false)
		try {
			await database.collection('foods').doc(temporalFoodRemove).delete()
		} catch (error) {
			alert(
				'Algo salió mal al intentar eliminar la información. Por favor inténtalo de nuevo.'
			)
		}
		setTemporalFoodRemove('')
	}

	const getfoods = async () => {
		try {
			database
				.collection('foods')
				.where('idUser', '==', currentUser.uid)
				.onSnapshot((querysnapshot) => {
					const docs = []

					setLoaders({
						...loaders,
						foodsLoader: true,
					})

					querysnapshot.forEach((doc) => {
						docs.push({ ...doc.data(), id: doc.id })
					})

					setfoods(docs)

					setLoaders({
						...loaders,
						foodsLoader: false,
					})
				})
		} catch (error) {
			alert(
				'Ocurrió un error al traer la información. Por favor inténtalo de nuevo.'
			)
		}
	}

	const addfood = async () => {
		const newfood = {
			...NewFood,
			price: parseInt(NewFood.price, 10),
			idUser: currentUser.uid,
		}

		setLoaders({
			...loaders,
			newfoodLoader: true,
		})

		try {
			await database.collection('foods').doc().set(newfood)
		} catch (error) {
			alert(
				'Algo salió mal al intentar enviar la información. Por favor inténtalo de nuevo.'
			)
			setOpenModal(false)
		}

		setLoaders({
			...loaders,
			newfoodLoader: false,
		})

		setNewFood('')
	}

	if (currentUser) {
		return (
			<UserPanelLayout
				isMiMenu
				title="Mi menú"
				openModal={(value) => setOpenModal(value)}
			>
				{ModalDelete && (
					<Modal closeModal={(value) => setModalDelete(value)}>
						<p>¿Quieres eliminar este alimento?</p>
						<div>
							<button
								className="modal__container__button"
								onClick={() => setModalDelete(false)}
							>
								Cancelar
							</button>
							<button
								onClick={() => confirmDeleteFood()}
								className="modal__container__button modal__container__button--red"
							>
								Eliminar
							</button>
						</div>
					</Modal>
				)}
				{openModal && (
					<Modal closeModal={(value) => setOpenModal(value)}>
						<p>Nombre de la sección</p>
						<form onSubmit={handleSubmit} className="modal__new-food__form">
							<label>
								Nombre
								<input
									placeholder="Hamburguesa doble"
									type="text"
									name="name"
									onChange={handleInput}
									required
									maxLength="20"
									className="input-modal__new-food newfoodForm"
								/>
							</label>
							<input
								placeholder="Bebidas, Postres, Aperitivos..."
								type="number"
								name="price"
								onChange={handleInput}
								required
								className="input-modal__new-food newfoodForm"
							/>
							<input
								placeholder="Bebidas, Postres, Aperitivos..."
								type="text"
								name="description"
								onChange={handleInput}
								required
								maxLength="50"
								className="input-modal__new-food newfoodForm"
							/>
							{loaders.newfoodLoader ? (
								<button
									disabled
									className="modal__container__button newfoodForm"
								>
									<Loader />
								</button>
							) : (
								<input
									type="submit"
									className="modal__container__button newfoodForm"
									value="Crear sección"
								/>
							)}
						</form>
					</Modal>
				)}
				<section className="mi-menu__container">
					<label className="mi-menu__container__label">
						<input
							className="mi-menu__container__input"
							maxLength="20"
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
					{loaders.foodsLoader ? (
						<Loader />
					) : (
						<>
							{foods.length === 0 ? (
								<div className="mi-menu__no-foods">
									<span>Todavía no tienes alimentos en tu menú</span>
								</div>
							) : (
								<>
									{foods.map((food) => {
										return (
											<div key={food.id} className="food-container">
												<h2>{food.name}</h2>
												<p>{food.description}</p>
												<strong>{food.price}</strong>
												<button onClick={() => onDeleteFood(food.id)}>X</button>
											</div>
										)
									})}
								</>
							)}
						</>
					)}
				</section>
			</UserPanelLayout>
		)
	}
	return <Redirect to="/" />
}

export default MiMenu
