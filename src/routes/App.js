import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Menu from '../pages/Menu'
import '../assets/css/index.css'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/app/:restaurant" component={Menu} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
