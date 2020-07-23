import React, { useEffect, useState, useContext } from 'react'
import Loader from '../components/Loader'
import app from '../firebaseConfig'
import SignInSocial from './SignInSocial'
import { AuthContext } from './Auth'
import { Redirect } from 'react-router-dom'

const Login = () => {
	const [form, setValues] = useState({})
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const { currentUser } = useContext(AuthContext)

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
		setErrors({})
		setLoading(true)
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = true))
		if (form.password === form.confirmPassword) {
			app
				.auth()
				.createUserWithEmailAndPassword(form.email, form.password)
				.then((userCredentials) => {
					return userCredentials.user.updateProfile({
						displayName: form.name,
					})
				})
				.catch((err) => {
					if (err.code === 'auth/email-already-in-use') {
						setErrors({
							email: true,
						})
					} else {
						setErrors({
							unexpected: true,
						})
					}
				})
		} else {
			setErrors({
				password: true,
			})
		}
		document
			.querySelectorAll('input')
			.forEach((input) => (input.disabled = false))
		setLoading(false)
	}

	if (currentUser) {
		return <Redirect to="/" />
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
						maxLength="30"
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
						minLength="8"
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
						name="confirmPassword"
						placeholder="Confirmar contraseña"
						className="login-register-form__input"
						type="password"
						required
						onChange={handleInput}
					/>
				</label>
				<input
					className="login-register-form__button regirter-grid--division"
					type="submit"
					value="Registrarse"
				/>
			</form>
			<SignInSocial setErrors={(e) => setErrors(e)} />
			{loading && <Loader />}
			<div className="login-register__errors">
				<span>
					<ul>
						{errors.password && (
							<li className="login-register__errors--li">
								Las contraseñas no coinciden
							</li>
						)}
						{errors.email && (
							<li className="login-register__errors--li">
								Este correo ya se encuentra registrado
							</li>
						)}
						{errors.unexpected && (
							<li className="login-register__errors--li">
								Ocurrió un error al enviar la información. Por favor intenta de
								nuevo
							</li>
						)}
						{errors.facebook && (
							<li className="login-register__errors--li">
								Ya existe una cuenta con la misma dirección de correo
								electrónico en un proveedor asociado con esta dirección de
								correo electrónico. Intenta ingresar con el correo electrónico o
								con Google.
							</li>
						)}
					</ul>
				</span>
			</div>
		</div>
	)
}

export default Login
