import { Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import Login from './pages/Login'
import Register from './pages/Register'
import styles from './styles/App.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { restoreSession } from './util/auth'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)

	const saveToken = (token) => {
		localStorage.setItem('token', token)
	}

	const checkToken = async () => {
		const user = await restoreSession()
		setUser(user)
		setLoggedIn(true)
	}

	const login = async (formState) => {
		//acount/login
		const res = await axios.post(
			'http://localhost:3001/api/account/login',
			formState
		)
		if (res.data.token) {
			setUser(res.data.user)
			setToken(res.data.token)
			if (formState.persist) {
				saveToken(res.data.token)
			}
			setLoggedIn(true)
		}
		console.log(res.data)
	}

	const logout = () => {}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkToken()
		}
	}, [])

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
