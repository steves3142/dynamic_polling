import Client from '../util/api'
import styles from '../styles/components/RoomForm.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RoomForm({ user, name }) {
	let navigate = useNavigate()
	const [roomName, setRoomName] = useState(name ? name : '')
	const [submitted, setSubmitted] = useState(false)

	const handleChange = (event) => {
		setRoomName(event.target.value)
	}

	useEffect(() => {}, [submitted])

	return (
		<div className={styles['wrapper']}>
			<div className={styles['form-body']}>
				<input
					className={styles['input']}
					type='text'
					name='room'
					value={roomName}
					onChange={handleChange}
					placeholder='room name'
				/>
			</div>
			<div className={styles['last-container']}>
				<div></div>
				<div className={styles['pseudo-button']}>Create</div>
			</div>
		</div>
	)
}
