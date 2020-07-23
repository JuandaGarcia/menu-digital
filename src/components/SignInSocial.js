import React from 'react'
import '../assets/css/components/SignInSocial.css'
import firebase from 'firebase/app'
import 'firebase/auth'

const SignInSocial = ({ setErrors }) => {
	// const googleProvider = new firebase.auth.GoogleAuthProvider()
	const facebookProvider = new firebase.auth.FacebookAuthProvider()

	// const googleAuth = () => {
	// 	firebase
	// 		.auth()
	// 		.signInWithPopup(googleProvider)
	// 		.catch((err) => {
	// 			alert(
	// 				'Algo salió mal al intentar ingresar con Google, por favor inténtalo de nuevo.'
	// 			)
	// 		})
	// }

	const facebookAuth = () => {
		firebase
			.auth()
			.signInWithPopup(facebookProvider)
			.catch((err) => {
				if (err.code === 'auth/account-exists-with-different-credential') {
					setErrors({
						facebook: true,
					})
				} else {
					alert(
						'Algo salió mal al intentar ingresar con Facebook, por favor inténtalo de nuevo.'
					)
				}
			})
	}

	return (
		<div className="sign-in-social">
			<hr className="sign-in-social__divider" />
			<div className="sign-in-social__container">
				{/* <button
					onClick={googleAuth}
					className="sign-in-social__button sign-in-social__button--google"
				>
					<img
						className="sign-in-social__button--img"
						src="/img/icons/google.svg"
						alt="Google"
					/>
				</button> */}
				<button
					onClick={facebookAuth}
					className="sign-in-social__button sign-in-social__button--facebook"
				>
					<img
						className="sign-in-social__button--img"
						src="/img/icons/facebook.svg"
						alt="Facebook"
					/>
				</button>
			</div>
		</div>
	)
}

export default SignInSocial
