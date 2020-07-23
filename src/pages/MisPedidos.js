import React, { useContext, useEffect } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import '../assets/css/pages/UserPanel.css'

const MisPedidos = () => {
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		document.title = 'Delimenú - Mis pedidos'
	}, [])

	if (currentUser) {
		return <UserPanelLayout title="Mis pedidos"></UserPanelLayout>
	}
	return <Redirect to="/" />
}

export default MisPedidos
