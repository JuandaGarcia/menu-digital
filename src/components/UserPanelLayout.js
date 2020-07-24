import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import HeaderUserPanel from './HeaderUserPanel'

const UserPanelLayout = ({ children, title, isMiMenu, openModal }) => {
	const { currentUser } = useContext(AuthContext)
	return (
		<div className="user-panel-container">
			<div className="user-panel">
				<HeaderUserPanel currentUser={currentUser} />
				<div className="user-panel__title">
					<h1 className="user-panel__title--h1">{title}</h1>
					{isMiMenu && (
						<button
							onClick={() => openModal(true)}
							className="user-panel__title--button"
						>
							Añadir alimento
							<img
								className="user-panel__title--button-icon"
								src="/img/icons/plus-circle.svg"
								alt="+"
							/>
						</button>
					)}
					{isMiMenu && (
						<div className="switch-container">
							<span className="switch-container__text">Publicar</span>
							<input
								type="checkbox"
								className="user-panel__switch_input"
								id="switch"
							/>
							<label className="user-panel__switch_label" htmlFor="switch">
								Toggle
							</label>
						</div>
					)}
				</div>
				{children}
			</div>
		</div>
	)
}

export default UserPanelLayout
