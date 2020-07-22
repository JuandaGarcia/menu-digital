import React, { useEffect } from 'react'

const Login = () => {
	useEffect(() => {
		document.title = 'Delimenú - Registro'
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()
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
						placeholder="Nombre"
						className="login-register-form__input"
						type="text"
						required
					/>
				</label>
				<label className="login-register-form__label regirter-grid--division">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/mail.svg"
						alt="User"
					/>
					<input
						placeholder="Correo"
						className="login-register-form__input"
						type="email"
						required
					/>
				</label>
				<label className="login-register-form__label register-grid__correccion-icon">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/padlock.svg"
						alt="User"
					/>
					<input
						placeholder="Contraseña"
						className="login-register-form__input"
						type="password"
						required
					/>
				</label>
				<label className="login-register-form__label register-grid__correccion-icon">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/padlock.svg"
						alt="User"
					/>
					<input
						placeholder="Contraseña"
						className="login-register-form__input"
						type="password"
						required
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
