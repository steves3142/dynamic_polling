import { Routes, Route, useNavigate } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import Login from './pages/Login'
import Register from './pages/Register'
import RoomLogin from './pages/RoomLogin'
import styles from './styles/App.module.css'
import { useState, useEffect } from 'react'
import Client from './util/api'
import { restoreSession } from './util/auth'
import io from 'socket.io-client'
import { BASE_URL } from './util/api'
import { useUserContext, useAccountInfoContext } from './util/useUserProvider'

const socket = io(`${BASE_URL}`)

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const { user, setUser } = useUserContext()
	const { accountInfo, setAccountInfo } = useAccountInfoContext()
	const [token, setToken] = useState(null)
	const [loginError, setLoginError] = useState('')

	//to conditionally render student page
	const [hasRoom, setHasRoom] = useState(false)
	const saveToken = (token) => {
		localStorage.setItem('token', token)
	}

	const checkToken = async () => {
		try {
			const user = await restoreSession()
			setUser(user)
			setLoggedIn(true)
		} catch (error) {
			setUser(null)
			setLoggedIn(true)
		}
	}

	const login = async (formState) => {
		//acount/login
		try {
			const res = await Client.post('/api/account/login', formState)
			if (res.data.token) {
				setUser(res.data.user)
				setToken(res.data.token)
				if (formState.persist) {
					saveToken(res.data.token)
				}
				setLoggedIn(true)
			}
		} catch (error) {
			setLoginError('Invalid Email or Password')

			//clearing loginError after 6s
			setTimeout(() => {
				setLoginError('')
			}, 6000)
		}
	}

	const getAccountTypeInfo = async () => {
		let res = await Client.get(`/api/account/accounttype/${user.type.toLowerCase()}/${user.id}`)
		setAccountInfo(res.data)
	}

	const getPage = () => {
		if (user.type === 'HOST') {
			return <Host socket={socket} logout={logout} />
		} else {
			return hasRoom ? (
				<Student socket={socket} hasRoom={hasRoom} logout={logout} />
			) : (
				<RoomLogin
					setHasRoom={setHasRoom}
					accountInfo={accountInfo}
					logout={logout}
					setAccountInfo={setAccountInfo}
				/>
			)
		}
	}

	const logout = () => {
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
			getAccountTypeInfo()
		}
	}, [user])

	return (
		<div className={styles['container']}>
			{loggedIn ? (
				<Routes>
					<Route path='/' element={getPage()} />
				</Routes>
			) : (
				<Routes>
					<Route path='/*' element={<Login login={login} loginError={loginError} />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			)}
		</div>
	)
}
export default App
