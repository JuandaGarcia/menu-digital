import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../components/Auth'
import UserPanel from '../components/UserPanel'
import LandingPage from '../components/LandingPage'

const Home = () => {
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		document.title = 'Delimenú - Home'
	}, [])

	if (currentUser) {
		return <UserPanel />
	}
	return <LandingPage />
}

export default Home
