import React, { useContext, useEffect, useState } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import Notiflix from 'notiflix'
import Loader from '../components/Loader'
import Modal from '../components/Modal'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import { database } from '../firebaseConfig'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MisPedidos.css'

const MisPedidos = () => {
	const { currentUser } = useContext(AuthContext)
	const [orders, setOrders] = useState([])
	const [DeleteOrder, setDeleteOrder] = useState('')
	const [DeleteModal, setDeleteModal] = useState(false)
	const [loaders, setLoaders] = useState({
		ordersLoader: true,
	})

	useEffect(() => {
		document.title = 'Delimenú - Mis pedidos'
		Notiflix.Notify.Init({ position: 'right-bottom' })
		getPedidos()
	}, [])

	const getPedidos = () => {
		try {
			database
				.collection('pedidos')
				.where('idUser', '==', currentUser.uid)
				.onSnapshot((querysnapshot) => {
					const docs = []

					setLoaders({
						...loaders,
						ordersLoader: true,
					})

					querysnapshot.forEach((doc) => {
						docs.push({ ...doc.data(), id: doc.id })
					})

					setOrders(docs)

					setLoaders({
						...loaders,
						ordersLoader: false,
					})
				})
		} catch (error) {
			Notiflix.Notify.Failure(
				'Ocurrió un error al traer la información. Por favor inténtalo de nuevo.'
			)
		}
	}

	const onDeleteOrder = (id) => {
		setDeleteOrder(id)
		setDeleteModal(true)
	}

	const confirmDeleteOrder = async () => {
		setDeleteModal(false)
		try {
			await database.collection('pedidos').doc(DeleteOrder).delete()
			Notiflix.Notify.Success('Se eliminó la comida correctamente.')
		} catch (error) {
			Notiflix.Notify.Failure(
				'Algo salió mal al intentar eliminar el pedido. Por favor inténtalo de nuevo.'
			)
		}
		setDeleteOrder('')
	}

	if (currentUser) {
		return (
			<UserPanelLayout title="Mis pedidos">
				{DeleteModal && (
					<Modal
						isOrders
						closeModal={(value) => setDeleteModal(value)}
						setDeleteOrder={(value) => setDeleteOrder(value)}
					>
						<p>¿Quieres eliminar este pedido?</p>
						<div>
							<button
								className="modal__container__button"
								onClick={() => setDeleteModal(false)}
							>
								Cancelar
							</button>
							<button
								onClick={() => confirmDeleteOrder()}
								className="modal__container__button modal__container__button--red"
							>
								Eliminar
							</button>
						</div>
					</Modal>
				)}
				<section>
					{loaders.ordersLoader ? (
						<Loader />
					) : (
						<>
							{orders.length === 0 ? (
								<div className="no-orders">
									<span>Todavía no tienes Pedidos</span>
								</div>
							) : (
								<>
									{orders.map((order) => {
										return (
											<div key={order.id} className="order-container">
												<div className="order-container__header">
													<h2>Mesa {order.mesa}</h2>
													<button
														onClick={() => onDeleteOrder(order.id)}
														className="order-container__header-button"
													>
														<img src="/img/icons/trash.svg" alt="Eliminar" />
													</button>
												</div>
												<br />
												<hr />
												<div className="order-container-row">
													<h4>Nombre</h4>
													<h4>Cantidad</h4>
													<h4>Precio</h4>
												</div>
												{order.products.map((product) => {
													return (
														<div
															key={product.id}
															className="order-container-row"
														>
															<span>{product.name}</span>
															<span>{product.cantidad}</span>
															<span>$ {product.price}</span>
														</div>
													)
												})}
												<br />
												<hr />
												<br />
												<h4>Observaciones</h4>
												<br />
												<p>{order.observaciones}</p>
												<br />
												<hr />
												<br />
												<p className="total-pedido">
													<strong>Total:</strong> ${order.total}
												</p>
												<br />
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

export default MisPedidos
