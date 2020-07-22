import React, { useContext } from 'react'
import app from '../firebaseConfig'
import { AuthContext } from './Auth'

const UserPanel = () => {
	const { currentUser } = useContext(AuthContext)
	const logOut = () => {
		app.auth().signOut()
	}
	return (
		<div>
			<button onClick={logOut}>salir</button>
			<span>{currentUser.displayName}</span>
		</div>
	)
}

export default UserPanel
