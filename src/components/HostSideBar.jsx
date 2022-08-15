import { useState } from 'react'
import styles from '../styles/components/HostSideBar.module.css'

export default function HostSideBar({ setMainDisplay, logout }) {
	const [fromDate, setFrom] = useState('')
	const [toDate, setTo] = useState('')

	const handleChange = (e) => {
		if (e.target.name == 'toDate') setTo(e.target.value)
		else setFrom(e.target.value)
	}

	return (
		<div className={styles['side-bar']}>
			<div className={styles['body']}>
				<div
					onClick={() => setMainDisplay(1)}
					className={styles['pseudo-button']}>
					New Question
				</div>
				<div
					onClick={() => setMainDisplay(4)}
					className={styles['pseudo-button']}>
					Room Announcement
				</div>
				<div
					onClick={() => setMainDisplay(2)}
					className={styles['pseudo-button']}>
					Hide/Show Answers
				</div>
				<div className={styles['review-dates']}>
					<input
						type='text'
						name='fromDate'
						
						className={styles['review-date']}
						placeholder='MM/DD/YYYY'
					/>
					<h4>to</h4>
					<input
						type='text'
						name='toDate'
						className={styles['review-date']}
						placeholder='MM/DD/YYYY'
					/>
				</div>
				<div className={styles['review-button']}>Review</div>
			</div>
			<div className={styles['logout-button']}>
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
		</div>
	)
}
