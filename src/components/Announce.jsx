import { useState, useEffect } from 'react'
import styles from '../styles/components/Announce.module.css'

export default function Announcement({ socket }) {
	// const [announce, setAnnounce] = useState([])
	let [input, setInput] = useState('')

	function handleChange(e) {
		setInput(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		socket.emit('room-announce', { message: input })
		setInput('')
	}

	return (
		<div className={styles['master-container']}>
			<div className={styles['pseudo-button']}>Room Announcement</div>

			<div>
				<div className={styles['message-container']}>
					<div className={styles['container']}>
						<form onSubmit={handleSubmit}>
							<input
								className={styles.form}
								type='text'
								name='announceInput'
								size='60'
								width='60'
								height='60'
								onChange={handleChange}
								value={input}
							/>
							<div>
								<button
									onClick={handleSubmit}
									className={styles.button}
									type='submit'>
									SEND
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
