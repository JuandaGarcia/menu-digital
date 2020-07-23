import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import HeaderUserPanel from './HeaderUserPanel'

const UserPanelLayout = ({ children, title }) => {
	const { currentUser } = useContext(AuthContext)
	return (
		<div className="user-panel-container">
			<div className="user-panel">
				<HeaderUserPanel currentUser={currentUser} />
				<div className="user-panel__title">
					<h1 className="user-panel__title--h1">{title}</h1>
				</div>
				{children}
			</div>
		</div>
	)
}

export default UserPanelLayout
