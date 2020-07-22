import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'

const Login = () => {
	const [form, setValues] = useState({})

	useEffect(() => {
		document.title = 'Delimenú - Registro'
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
			.createUserWithEmailAndPassword(form.email, form.password)
			.then((userCredentials) => {
				console.log(userCredentials)
			})
			.catch((err) => {
				if (err.code === 'auth/email-already-in-use') {
					console.log('El usario ya esta registrado')
				}
			})
	}

	return (
		<div className="login-register-container__grid">
			<h1>Registrarse</h1>
			<form onSubmit={handleSubmit} className="regirter-grid">
				<label className="login-register-form__label regirter-grid--division">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/user.svg"
						alt="User"
					/>
					<input
						name="name"
						placeholder="Nombre"
						className="login-register-form__input"
						type="text"
						required
						onChange={handleInput}
					/>
				</label>
				<label className="login-register-form__label regirter-grid--division">
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
				<label className="login-register-form__label register-grid__correccion-icon">
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
				<label className="login-register-form__label register-grid__correccion-icon">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/padlock.svg"
						alt="User"
					/>
					<input
						name="ConfirmPassword"
						placeholder="Confirmar contraseña"
						className="login-register-form__input"
						type="password"
						required
						onChange={handleInput}
					/>
				</label>
				<button
					className="login-register-form__button regirter-grid--division"
					type="submit"
				>
					Registrarse
				</button>
			</form>
		</div>
	)
}

export default Login
