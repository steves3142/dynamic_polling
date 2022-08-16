import styles from '../styles/components/StudentPopUp.module.css'

export default function StudentPopUp({ text }) {
	return (
		<div className={styles['popup']}>
			<div>
				<p className={styles['heading-text']}>Anouncement</p>
			</div>
			<br />
			<div>{text}</div>
		</div>
	)
}
