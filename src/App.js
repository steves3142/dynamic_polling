import { Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import styles from './styles/App.module.css'
import { useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
	return (
		<div className={styles['container']}>
			<Routes>
				<Route path='/' element={<div>Home Page</div>} />
				<Route path='/student' element={<Student socket={socket} />} />
				<Route path='/host' element={<Host socket={socket} />} />
			</Routes>
		</div>
	)
}

export default App
