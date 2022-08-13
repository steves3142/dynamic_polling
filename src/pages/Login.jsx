import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/pages/Login.module.css'
import axios from 'axios'

export default function Login({ login }) {
	let navigate = useNavigate()
	const initialForm = {
		email: '',
		password: '',
		persist: true,
	}
	const [formState, setFormState] = useState(initialForm)
	const [submitted, setSubmitted] = useState(false)
	const handleChange = (event) => {
		if (event.target.id == 'persist') {
			console.log(event.target.checked)
			setFormState({ ...formState, [event.target.id]: event.target.checked })
		} else {
			setFormState({ ...formState, [event.target.id]: event.target.value })
		}
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
					<div className={styles['login-element']}>
						<p className={styles['text']}>Keep me logged in</p>
						<input
							className={styles['checkbox']}
							type='checkbox'
							id='persist'
							onChange={handleChange}
							value={formState.persist}
						/>
					</div>

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
