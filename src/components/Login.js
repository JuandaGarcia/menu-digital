import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { auth } from '../firebase'

const Login = () => {
	const [form, setValues] = useState({})
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		document.title = 'Delimenú - Inicio de sesión'
	}, [])

	const handleInput = (event) => {
		setValues({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setErrors({})
		setLoading(true)
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = true))
		auth
			.signInWithEmailAndPassword(form.email, form.password)
			.then((userCredentials) => {
				console.log(userCredentials)
			})
			.catch((err) => {
				if (
					err.code === 'auth/user-not-found' ||
					err.code === 'auth/wrong-password'
				) {
					setErrors({
						incorrect: true,
					})
				} else {
					setErrors({
						unexpected: true,
					})
				}
				console.log(err)
			})
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = false))
		setLoading(false)
	}

	return (
		<div className="login-register-container__grid">
			<h1>Iniciar Sesión</h1>
			<form onSubmit={handleSubmit} className="login-grid">
				<label className="login-register-form__label">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/mail.svg"
						alt="User"
					/>
					<input
						name="email"
						placeholder="Correo"
						className="login-register-form__input"
						type="email"
						required
						onChange={handleInput}
					/>
				</label>
				<label className="login-register-form__label">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/padlock.svg"
						alt="User"
					/>
					<input
						name="password"
						placeholder="Contraseña"
						className="login-register-form__input"
						type="password"
						required
						onChange={handleInput}
					/>
				</label>
				<input
					className="login-register-form__button"
					type="submit"
					value="Iniciar Sesión"
				/>
			</form>
			{loading && <Loader />}
			<div className="login-register__errors">
				<span>
					<ul>
						{errors.incorrect && (
							<li className="login-register__errors--li">
								El correo o la contraseña es incorrecto
							</li>
						)}
						{errors.unexpected && (
							<li className="login-register__errors--li">
								Ocurrió un error al enviar la información. Por favor intenta de
								nuevo
							</li>
						)}
					</ul>
				</span>
			</div>
		</div>
	)
}

export default Login
