import { Routes, Route, useNavigate } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import Login from './pages/Login'
import Register from './pages/Register'
import RoomSelect from './pages/RoomLogin'
import styles from './styles/App.module.css'
import { useState, useEffect } from 'react'
import Client from './util/api'
import { restoreSession } from './util/auth'
import io from 'socket.io-client'
import { BASE_URL } from './util/api'

const socket = io(`${BASE_URL}`)

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [accountInfo, setAccountInfo] = useState(null)
	//to conditionally render student page
	const [hasRoom, setHasRoom] = useState(false)
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
		const res = await Client.post('/api/account/login', formState)
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

	const getAccountTypeInfo = async () => {
		let res = await Client.get(
			`/api/account/accounttype/${user.type.toLowerCase()}/${user.id}`
		)
		setAccountInfo(res.data)
		if (res.data.room_id) {
			setHasRoom(true)
		}
	}
	const logout = () => {
		console.log('logout called')
		setLoggedIn(false)
		setUser(null)
		localStorage.clear()
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkToken()
		}
	}, [])

	//once user logged in get the related account type info
	useEffect(() => {
		if (user) {
			console.log(user)
			getAccountTypeInfo()
		}
	}, [user])

	return (
		<div className={styles['container']}>
			{loggedIn ? (
				<Routes>
					<Route path='/' element={<div>Home Page</div>} />
					<Route
						path='/student'
						element={
							hasRoom ? (
								<Student
									socket={socket}
									user={user}
									accountInfo={accountInfo}
									hasRoom={hasRoom}
									logout={logout}
								/>
							) : (
								<RoomSelect
									setHasRoom={setHasRoom}
									accountInfo={accountInfo}
									logout={logout}
									setAccountInfo={setAccountInfo}
								/>
							)
						}
					/>
					<Route
						path='/host'
						element={
							<Host
								socket={socket}
								user={user}
								accountInfo={accountInfo}
								logout={logout}
							/>
						}
					/>
				</Routes>
			) : (
				<Routes>
					<Route path='/*' element={<Login login={login} />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			)}
		</div>
	)
}
export default App
