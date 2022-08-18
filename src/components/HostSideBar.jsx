import { useState, useEffect } from 'react'
import Client from '../util/api'
import styles from '../styles/components/HostSideBar.module.css'

export default function HostSideBar({
	setMainDisplay,
	logout,
	setQuestionList,
	questionList,
	setQuestionFormAction,
	currentQuestion,
	setCurrentQuestion,
	setAnswers,
	mainDisplay,
	room,
}) {
	const today = new Date()
	const dateString = today.toLocaleDateString()
	const [fromDate, setFrom] = useState(dateString)
	const [toDate, setTo] = useState(dateString)
	const [pullingLog, setPullingLog] = useState(false)
	//for pulling log before selecting room
	const [errorMsg, setErr] = useState('')
	const handleChange = (e) => {
		if (e.target.name == 'toDate') setTo(e.target.value)
		else setFrom(e.target.value)
	}

	const pullLog = async () => {
		if (!room) {
			return setErr('No Room Selected')
		}
		let fromDateSplit = fromDate.split('/')
		let toDateSplit = toDate.split('/')
		let from = new Date(
			fromDateSplit[2],
			fromDateSplit[0] - 1,
			fromDateSplit[1]
		)
		from = from.toISOString()
		let to = new Date(toDateSplit[2], toDateSplit[0] - 1, toDateSplit[1])
		to.setDate(to.getDate() + 1)
		to = to.toISOString()
		let questionList = await Client.post(
			`/api/host/pull/questions/${room.id}`,
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

	const pullQuestion = async (questionId) => {
		console.log(questionId)
		let res = await Client.get(`/api/host/pull/question/${questionId}`)
		setCurrentQuestion(res.data)
		setAnswers(res.data.answers)
	}

	const deleteQuestionLog = async (index) => {
		let tempQuestionList = [...questionList]

		let res = await Client.delete(
			`/api/host/delete/${tempQuestionList[index].id}`
		)
		console.log(res.data)
		let deleteQuestion = tempQuestionList.splice(index, 1)
		setQuestionList(tempQuestionList)

		//clearing previous
		setCurrentQuestion(null)
		setAnswers([])

		console.log(tempQuestionList)
	}

	useEffect(() => {
		if (pullingLog) {
			pullLog()
		}
	}, [pullingLog])

	useEffect(() => {
		setTimeout(() => {
			setErr('')
		}, 3000)
	}, [errorMsg])

	return (
		<div className={styles['side-bar']}>
			<div className={styles['body']}>
				<div
					onClick={() => {
						setQuestionFormAction('NEW')
						setMainDisplay(2)
					}}
					className={styles['pseudo-button']}>
					Library
				</div>
				<div
					onClick={() => {
						setQuestionFormAction('NEW')
						setMainDisplay(1)
					}}
					className={styles['pseudo-button']}>
					New Question
				</div>
				<div
					onClick={() => {
						if (currentQuestion) {
							setQuestionFormAction('UPDATE')
						}
						setMainDisplay(1)
					}}
					className={styles['pseudo-button']}>
					Update Question
				</div>
				<div
					onClick={() => setMainDisplay(4)}
					className={styles['pseudo-button']}>
					Room Announcement
				</div>
				<div
					onClick={() => {
						mainDisplay == 3 ? setMainDisplay(0) : setMainDisplay(3)
					}}
					className={styles['pseudo-button']}>
					{mainDisplay == 3 ? 'Hide Display' : 'Show Display'}
				</div>
				{errorMsg}
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
				<div className={styles['empty-review']}>
					<div className={styles['question-log']}>
						{questionList.map((question, index) => (
							<div
								onClick={() => pullQuestion(question.id)}
								className={styles['review-questions']}
								key={question.id}>
								<p className={styles['review-questions-text']}>
									{question.question}
								</p>
								<div
									onClick={() => {
										deleteQuestionLog(index)
									}}
									className={styles['delete']}>
									delete
								</div>
							</div>
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
