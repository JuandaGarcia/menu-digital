import React, { useContext, useEffect, useState } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import Notiflix from 'notiflix'
import Loader from '../components/Loader'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import { database } from '../firebaseConfig'
import '../assets/css/pages/UserPanel.css'
import '../assets/css/components/MisPedidos.css'

const MisPedidos = () => {
	const { currentUser } = useContext(AuthContext)
	const [orders, setOrders] = useState([])
	const [loaders, setLoaders] = useState({
		ordersLoader: true,
	})

	useEffect(() => {
		document.title = 'Delimenú - Mis pedidos'
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

	if (currentUser) {
		return (
			<UserPanelLayout title="Mis pedidos">
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
												<h2>Mesa {order.mesa}</h2>
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
