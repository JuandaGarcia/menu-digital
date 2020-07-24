import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../components/Auth'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import MiMenu from '../pages/MiMenu'
import MisPedidos from '../pages/MisPedidos'
import NotFound from '../pages/NotFound'
import LoginRegisterContainer from '../pages/LoginRegisterContainer'
import '../assets/css/index.css'

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={LoginRegisterContainer} />
					<Route exact path="/register" component={LoginRegisterContainer} />
					<Route exact path="/mi-menu" component={MiMenu} />
					<Route exact path="/mis-pedidos" component={MisPedidos} />
					<Route exact path="/menu/:id" component={Menu} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
