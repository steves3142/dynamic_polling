import styles from '../styles/components/HostSideBar.module.css'

export default function HostSideBar({ setMainDisplay, logout }) {
	return (
		<div className={styles['side-bar']}>
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
					className={styles['review-date']}
					name='start-date'
					placeholder='DD/YY'
				/>
				<h4>to</h4>
				<input
					type='text'
					className={styles['review-date']}
					name='start-date'
					placeholder='DD/YY'
				/>
			</div>
			<div className={styles['review-button']}>Review</div>
			<div className={styles['logout-button']}>
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
		</div>
	)
}
