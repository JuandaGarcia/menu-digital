import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'

const Login = () => {
	const [form, setValues] = useState({})

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
		auth
			.signInWithEmailAndPassword(form.email, form.password)
			.then((userCredentials) => {
				console.log(userCredentials)
			})
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
				<button className="login-register-form__button" type="submit">
					Iniciar Sesión
				</button>
			</form>
		</div>
	)
}

export default Login
