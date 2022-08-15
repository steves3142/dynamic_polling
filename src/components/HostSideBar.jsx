import { useState, useEffect } from 'react'
import Client from '../util/api'
import styles from '../styles/components/HostSideBar.module.css'

export default function HostSideBar({
	setMainDisplay,
	logout,
	setQuestionList,
	questionList,
}) {
	const today = new Date()
	const dateString = today.toLocaleDateString()
	const [fromDate, setFrom] = useState(dateString)
	const [toDate, setTo] = useState(dateString)
	const [pullingLog, setPullingLog] = useState(false)
	const handleChange = (e) => {
		if (e.target.name == 'toDate') setTo(e.target.value)
		else setFrom(e.target.value)
	}

	const pullLog = async () => {
		let fromDateSplit = fromDate.split('/')
		let toDateSplit = toDate.split('/')
		let from = new Date(
			fromDateSplit[2],
			fromDateSplit[0] - 1,
			fromDateSplit[1]
		)
		from = from.toISOString()
		let to = new Date(toDateSplit[2], toDateSplit[0] - 1, toDateSplit[1])
		to = to.toISOString()
		console.log(from, to)
		let questionList = await Client.post(
			`/api/host/pull/questions/${/*roomid */ 1}`,
			{
				range: {
					to: to,
					from: from,
				},
			}
		)
		setQuestionList(questionList.data)
		setPullingLog(false)
	}

	useEffect(() => {
		if (pullingLog) {
			pullLog()
		}
	}, [pullingLog])

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
						value={fromDate}
						onChange={handleChange}
						className={styles['review-date']}
						placeholder='MM/DD/YYYY'
					/>
					<h4>to</h4>
					<input
						type='text'
						name='toDate'
						value={toDate}
						onChange={handleChange}
						className={styles['review-date']}
						placeholder='MM/DD/YYYY'
					/>
				</div>
				<div
					onClick={() => setPullingLog(true)}
					className={styles['review-button']}>
					Review
				</div>
				<div className={styles['empty-review']} >
				<div className={styles['question-log']} >
					{questionList.map((question) => (
						<div className={styles['review-questions']} key={question.id}>{question.question}</div>
					))}
				</div>
			</div>
			</div>
			<div className={styles['logout-button']}>
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
		</div>
	)
}
