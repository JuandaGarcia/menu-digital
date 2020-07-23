import React, { useContext, useEffect } from 'react'
import UserPanelLayout from '../components/UserPanelLayout'
import { AuthContext } from '../components/Auth'
import { Redirect } from 'react-router-dom'
import '../assets/css/pages/UserPanel.css'

const MiMenu = () => {
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		document.title = 'Delimenú - Mi menú'
	}, [])

	if (currentUser) {
		return <UserPanelLayout title="Mi menú"></UserPanelLayout>
	}
	return <Redirect to="/" />
}

export default MiMenu
