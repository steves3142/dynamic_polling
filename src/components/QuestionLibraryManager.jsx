import styles from '../styles/components/QuestionLibraryManager.module.css'

export default function QuestionLibraryManager() {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['panel']}>
				<div className={styles['drop-down-list']}>Drop down</div>
				<div className={styles['panel-body']}>Body</div>
			</div>
			<div className={styles['panel']}>
				<div className={styles['drop-down-list']}>Drop down</div>
				<div className={styles['panel-body']}>Body</div>
			</div>
			<div className={styles['panel']}>3</div>
		</div>
	)
}
