import React, { useEffect } from 'react'
import { auth } from '../firebase'

const Home = () => {
	useEffect(() => {
		const user = auth.currentUser
		if (user) {
			console.log('Esta logueado')
		} else {
			console.log('No Esta logueado')
		}
	}, [])
	return <div>Hola</div>
}

export default Home
