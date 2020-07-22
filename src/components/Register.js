import React from 'react'

const Login = () => {
	const handleSubmit = (event) => {
		event.preventDefault()
	}

	return (
		<div className="login-register-container__grid">
			<h1>Registrarse</h1>
			<form onSubmit={handleSubmit} className="login-grid">
				<label className="login-register-form__label">
					<img
						className="login-register-form__label__icon"
						src="/img/icons/user.svg"
						alt="User"
					/>
					<input
						placeholder="Correo"
						className="login-register-form__input"
						type="email"
						required
					/>
				</label>
				<label className="login-register-form__label">
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
				<button className="login-register-form__button" type="submit">
					Iniciar Sesión
				</button>
			</form>
		</div>
	)
}

export default Login
