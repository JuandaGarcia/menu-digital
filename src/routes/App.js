import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import LoginRegisterContainer from '../pages/LoginRegisterContainer'
import '../assets/css/index.css'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={LoginRegisterContainer} />
				<Route exact path="/register" component={LoginRegisterContainer} />
				<Route exact path="/menu/:restaurant" component={Menu} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
