import React, { useContext, useEffect, useState } from 'react'
import Notiflix from 'notiflix'
import UserPanelLayout from '../components/UserPanelLayout'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import { database } from '../firebaseConfig'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MiMenu.css'

const MiMenu = () => {
	const InitialStateInputValues = {
		name: '',
		price: '',
		description: '',
	}
	const { currentUser } = useContext(AuthContext)
	const [openModal, setOpenModal] = useState(false)
	const [NewFood, setNewFood] = useState(InitialStateInputValues)
	const [foods, setfoods] = useState([])
	const [active, setActive] = useState(false)
	const [temporalFoodEdit, setTemporalFoodEdit] = useState('')
	const [temporalFoodRemove, setTemporalFoodRemove] = useState('')
	const [ModalDelete, setModalDelete] = useState(false)
	const [loaders, setLoaders] = useState({
		foodsLoader: true,
	})

	useEffect(() => {
		document.title = 'Delimenú - Mi menú'
		Notiflix.Notify.Init({ position: 'right-bottom' })
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

		if (temporalFoodEdit) {
			await confirmEditFood()
		} else {
			await addfood()
		}

		document
			.querySelectorAll('.newfoodForm')
			.forEach((input) => (input.disabled = false))
		setOpenModal(false)
	}

	const onEditFood = async (id) => {
		setTemporalFoodEdit(id)
		const doc = await database.collection('foods').doc(id).get()
		setNewFood(doc.data())
		setOpenModal(true)
	}
	const onDeleteFood = (id) => {
		setTemporalFoodRemove(id)
		setModalDelete(true)
	}

	const confirmDeleteFood = async () => {
		setModalDelete(false)
		try {
			await database.collection('foods').doc(temporalFoodRemove).delete()
			Notiflix.Notify.Success('Se eliminó la comida correctamente.')
		} catch (error) {
			Notiflix.Notify.Failure(
				'Algo salió mal al intentar eliminar la información. Por favor inténtalo de nuevo.'
			)
		}
		setTemporalFoodRemove('')
	}

	const confirmEditFood = async () => {
		try {
			await database.collection('foods').doc(temporalFoodEdit).update(NewFood)
			Notiflix.Notify.Success('Se actualizo la comida correctamente.')
		} catch (error) {
			Notiflix.Notify.Failure('Algo salió mal. Por favor inténtalo de nuevo.')
		}
		setNewFood(InitialStateInputValues)
		setTemporalFoodEdit('')
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
			Notiflix.Notify.Failure(
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
			Notiflix.Notify.Success('Se añadió la comida correctamente.')
		} catch (error) {
			Notiflix.Notify.Failure(
				'Algo salió mal al intentar enviar la información. Por favor inténtalo de nuevo.'
			)
			setOpenModal(false)
		}

		setLoaders({
			...loaders,
			newfoodLoader: false,
		})

		setNewFood(InitialStateInputValues)
	}

	if (currentUser) {
		return (
			<UserPanelLayout
				isMiMenu
				title="Mi menú"
				setActive={(value) => setActive(value)}
				openModal={(value) => setOpenModal(value)}
			>
				{ModalDelete && (
					<Modal closeModal={(value) => setModalDelete(value)}>
						<p>¿Quieres eliminar esta comida?</p>
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
					<Modal
						closeModal={(value) => setOpenModal(value)}
						setTemporalFoodEdit={(value) => setTemporalFoodEdit(value)}
					>
						<form onSubmit={handleSubmit} className="modal__new-food__form">
							<h2>{temporalFoodEdit ? 'Editar' : 'Añadir'}</h2>
							<br />
							<label>
								Nombre
								<input
									placeholder="Hamburguesa doble..."
									value={NewFood.name}
									type="text"
									name="name"
									onChange={handleInput}
									required
									maxLength="20"
									className="input-modal__new-food newfoodForm"
								/>
							</label>
							<label>
								Precio
								<input
									placeholder="20000..."
									value={NewFood.price}
									type="number"
									name="price"
									onChange={handleInput}
									required
									className="input-modal__new-food newfoodForm"
								/>
							</label>
							<label>
								Descripción
								<textarea
									placeholder="es un tipo de sándwich hecho a base de carne molida aglutinada en forma de filete cocinado a la parrilla o a la plancha, aunque también puede freírse u hornearse..."
									value={NewFood.description}
									type="text"
									name="description"
									onChange={handleInput}
									required
									className="input-modal__new-food input-modal__new-food--textarea newfoodForm"
								/>
							</label>
							<input
								type="submit"
								className="modal__container__button newfoodForm"
								value={temporalFoodEdit ? 'Editar comida' : 'Añadir comida'}
							/>
						</form>
					</Modal>
				)}
				<section className="mi-menu__container">
					{active && (
						<div className="menu-link-qr fadeIn">
							<p>
								Tu menú esta disponible en:
								<a
									className="menu-link-qr__link"
									rel="noopener noreferrer"
									target="_blank"
									href={`${window.location.origin.toString()}/menu/${
										currentUser.uid
									}`}
								>{` ${window.location.origin.toString()}/menu/${
									currentUser.uid
								}`}</a>
							</p>
							<a
								className="menu-link-qr__qr"
								role="button"
								href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${window.location.origin.toString()}/menu/${
									currentUser.uid
								}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								Código QR del menú
								<img
									className="menu-link-qr__qr--icon"
									src="/img/icons/qrcode.svg"
									alt="QR"
								/>
							</a>
						</div>
					)}
					{loaders.foodsLoader ? (
						<Loader />
					) : (
						<>
							{foods.length === 0 ? (
								<div className="mi-menu__no-foods">
									<span>Todavía no tienes comida en tu menú</span>
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
												<button onClick={() => onEditFood(food.id)}>
													edit
												</button>
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
