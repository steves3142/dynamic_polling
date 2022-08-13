import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/pages/Login.module.css'
import axios from 'axios'

export default function Login({ login }) {
	let navigate = useNavigate()
	const initialForm = {
		email: '',
		password: '',
	}
	const [formState, setFormState] = useState(initialForm)
	const [submitted, setSubmitted] = useState(false)
	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		setSubmitted(true)
	}

	useEffect(() => {
		if (submitted) {
			console.log('login clicked')
			login(formState)
			setSubmitted(false)
		}
	}, [submitted])

	return (
		<div className={styles.container}>
			<h2>Login</h2>
			<form>
				<div className={styles['form-wrapper']}>
					<input
						className={styles['login-element']}
						type='email'
						id='email'
						onChange={handleChange}
						value={formState.email}
						placeholder='email@email.com'
						required
					/>
					<input
						type='password'
						id='password'
						onChange={handleChange}
						value={formState.password}
						placeholder='Password'
						className={styles['login-element']}
						required
					/>
					<div className={styles['button-container']}>
						<div
							onClick={() => navigate('/register')}
							className={styles['pseudo-button']}>
							Register
						</div>
						<div onClick={handleSubmit} className={styles['pseudo-button']}>
							Login
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
