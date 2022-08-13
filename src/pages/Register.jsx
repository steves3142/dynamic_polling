import { useEffect, useState } from 'react'
import styles from '../styles/pages/Register.module.css'

import axios from 'axios'

export default function Register() {
	const [formState, setFormState] = useState([])

	const initialForm = {
		email: '',
		password: '',
		confirmPassword: '',
		type: 'MC',
	}

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let res = await axios.post(`http://localhost:3001/api/host`, formState)
		console.log('hola')
		console.log(res.data)
		setFormState(initialForm)
	}

	return (
		<div className={styles.container}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div id='rectangle' className={styles['form-wrapper']}>
					<input
						className={styles['login-element']}
						type='email'
						id='email'
						onChange={handleChange}
						value={formState.email}
						placeholder='email@email.com'
					/>
					<input
						type='password'
						id='password'
						onChange={handleChange}
						value={formState.password}
						placeholder='Password'
						className={styles['login-element']}
					/>
					<input
						type='password'
						id='confirmPassword'
						onChange={handleChange}
						value={formState.password}
						placeholder='Confirm Password'
						className={styles['login-element']}
					/>
					<div className={styles['pseudo-button']}>Sign Up</div>
				</div>
			</form>
		</div>
	)
}
