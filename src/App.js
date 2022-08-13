import { Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import Login from './pages/Login'
import Register from './pages/Register'
import styles from './styles/App.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)

	const login = async (formState) => {
		//acount/login
		const res = await axios.post(
			'http://localhost:3001/api/account/login',
			formState
		)
		if (res.data.token) {
			setUser(res.data.user)
			setToken(res.data.token)
			setLoggedIn(true)
		}
		console.log(res.data)
	}

	return (
		<div className={styles['container']}>
			{loggedIn ? (
				<Routes>
					<Route path='/' element={<div>Home Page</div>} />
					<Route path='/student' element={<Student socket={socket} />} />
					<Route path='/host' element={<Host socket={socket} />} />
				</Routes>
			) : (
				<Routes>
					<Route path='/' element={<Login login={login} />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			)}
		</div>
	)
}
export default App
