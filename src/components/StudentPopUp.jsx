import styles from '../styles/components/StudentPopUp.module.css'

export default function StudentPopUp({ text, showAnnouncement }) {
	return (
		<div className={[styles['popup'], showAnnouncement ? styles['show-popup'] : styles['hide-popup']].join( ' ' )}  >
			<div>
				<p className={styles['heading-text']}>Announcement</p>
			</div>
			<br />
			<div>{text}</div>
		</div>
	)
}
