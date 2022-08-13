import { useEffect, useState } from 'react'
import { validateEmail, validatePassword } from '../util/logic'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/pages/Register.module.css'

import axios from 'axios'

export default function Register() {
	const navigate = useNavigate()
	const initialForm = {
		email: '',
		password: '',
		confirmPassword: '',
		type: 'CLIENT',
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
	//Asdf1234!
	//Asdf1234!
	const submit = async () => {
		let res = await axios.post(
			`http://localhost:3001/api/account/submit/host`,
			formState
		)
		console.log('hola')
		console.log(res.data)
		setFormState(initialForm)
		navigate('/')
	}

	useEffect(() => {
		if (submitted) {
			let canSubmit = true
			if (!validateEmail(formState.email)) {
				console.log('invalid email')
				canSubmit = false
			}

			if (!validatePassword(formState.password, formState.confirmPassword)) {
				console.log('invalid password')
				canSubmit = false
			}
			if (canSubmit) {
				submit()
			}
			setSubmitted(false)
		}
	}, [submitted])

	return (
		<div className={styles.container}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
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
					<input
						type='password'
						id='confirmPassword'
						onChange={handleChange}
						value={formState.confirmPassword}
						placeholder='Confirm Password'
						className={styles['login-element']}
						required
					/>
					<select
						className={styles['drop-down-component']}
						defaultValue={formState.type}
						id='type'
						onChange={handleChange}
						required>
						<option value={'CLIENT'}>Client</option>
						<option value={'HOST'}>Host</option>
					</select>
					<div className={styles['button-container']}>
						<div
							onClick={() => {
								navigate('/')
							}}
							className={styles['pseudo-button']}>
							Login
						</div>
						<div onClick={handleSubmit} className={styles['pseudo-button']}>
							Sign Up
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}
