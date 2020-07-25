import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/pages/LandingPage.css'

const LandingPage = () => {
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
				<h1 className="landing-container__main--h1">
					Lleva tu restaurante
					<br />a otro nivel.
				</h1>
				<br />
				<br />
				<p className="landing-container__main--p">
					Delimenú es la mejor herramienta de creación
					<br />
					de menús digitales.
				</p>
				<div className="landing-container__button-hero">
					<Link
						className="landing__button__main landing__button__main-demo"
						to="/menu/py5Uygez0IfRaAEOM9x4IVLxssM2"
					>
						<span>Demo</span>
						<img
							className="landing__button--img"
							src="/img/icons/arrow-right-black.svg"
							alt="→"
						/>
					</Link>
					<Link
						className="landing__button__main landing__button"
						to="/register"
					>
						<span>Registrate gratis</span>
						<img
							className="landing__button--img"
							src="/img/icons/arrow-right.svg"
							alt="→"
						/>
					</Link>
				</div>
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

export default LandingPage
