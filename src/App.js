import { Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import Host from './pages/Host'
import Login from './pages/Login'
import Register from './pages/Register'
import styles from './styles/App.module.css'

function App() {
	return (
		<div className={styles['container']}>
			<Routes>
				<Route path='/' element={<div>Home Page</div>} />
				<Route path='/student' element={<Student />} />
				<Route path='/host' element={<Host />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	)
}

export default App
