import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/pages/LandingPage.css'

const NotFound = () => {
	useEffect(() => {
		document.title = 'Delimenú - 404'
	}, [])
	return (
		<div className="landing-container">
			<header className="header-landing">
				<Link className="header-landing__logo" to="/">
					<img
						className="header-landing__logo--img"
						src="/img/logos/delimenu.svg"
						alt="logo"
					/>
				</Link>
				<div>
					<Link className="header-landing__login" to="/login">
						<div>Iniciar sesión</div>
					</Link>
					<Link
						className="landing__button--header landing__button"
						to="/register"
					>
						Registrate gratis
					</Link>
				</div>
			</header>
			<main className="fadeIn landing-container__main">
				<h1 className="landing-container__main--h1">404</h1>
				<br />
				<br />
				<p className="landing-container__main--p">
					No se encontró esta página.
				</p>
				<Link className="landing__button__main landing__button" to="/">
					<span>Ir al inicio</span>
					<img
						className="landing__button--img"
						src="/img/icons/arrow-right.svg"
						alt="→"
					/>
				</Link>
			</main>
			<div>
				<img
					className="landing-container__illustration"
					src="/img/illustrations/landing.svg"
					alt="Restaurant"
				/>
			</div>
		</div>
	)
}

export default NotFound
