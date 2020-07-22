import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { Link } from 'react-router-dom'
import '../assets/css/pages/LoginRegister.css'

const LoginRegisterContainer = ({ match }) => {
	return (
		<div className="login-register">
			<div className="login-register__form">
				<Link to="/">
					<img
						className="login-register__form__logo"
						src="/img/logos/delimenu.svg"
						alt="Logo"
					/>
				</Link>
				{match.path === '/login' ? <Login /> : <Register />}
				<div className="login-register__links-question">
					<span>
						¿No tienes cuenta?
						{match.path === '/login' ? (
							<Link
								className="login-register__form__question__link"
								to="/register"
							>
								<strong> Regístrate</strong>
							</Link>
						) : (
							<Link
								className="login-register__form__question__link"
								to="/login"
							>
								<strong> Inicia sesión</strong>
							</Link>
						)}
					</span>
					<div className="login-register__form__links">
						<Link className="login-register__form__links--link" to="/">
							Términos y condiciones
						</Link>
						<Link className="login-register__form__links--link" to="/">
							Política de privacidad
						</Link>
						<Link className="login-register__form__links--link" to="/">
							Cookies
						</Link>
						<br />
						<br />
						<span className="login-register__form__links--link">
							© 2020 delimenú, Inc.
						</span>
					</div>
				</div>
			</div>
			<div className="login-register__content">
				<span className="login-register__content__title">
					No dejes que tu restaurante se estanque en la era digital
				</span>
				<img
					className="login-register__content__image"
					src="/img/illustrations/login_register.png"
					alt="Ilustración"
				/>
			</div>
		</div>
	)
}

export default LoginRegisterContainer
