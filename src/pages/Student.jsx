import styles from '../styles/pages/Student.module.css'
import Chatbox from '../components/Chatbox'
import Client from '../util/api'
import { useState, useEffect } from 'react'
import AnswerBox from '../components/AnswerBox'
import StudentPopUp from '../components/StudentPopUp'

export default function Student({ socket, logout, accountInfo, user }) {
	const [answered, setAnswered] = useState(false)
	const [announcement, setAnnoucement] = useState('')
	const [showAnnouncement, setShowAnnnouncement] = useState(false)
	const [question, setQuestion] = useState({
		question: 'Dummy Question?',
		type: 'MC',
		room_id: 1,
		choices: [
			{
				choice: 'dummy choice 1',
				question_id: 1,
			},
			{
				choice: 'dummy choice 1',
				question_id: 1,
			},
			{
				choice: 'dummy choice 1',
				question_id: 1,
			},
			{
				choice: 'dummy choice 1',
				question_id: 1,
			},
		],
	})
	let [answer, setAnswer] = useState('')
	let [submitted, setSubmitted] = useState(false)

	function submitAnswer(e) {
		e.preventDefault()
		if (!answered) {
			setSubmitted(true)
			console.log('submmited answer')
		} else {
			console.log('Already submitted')
		}
	}

	async function logAnswer() {
		console.log(answered)
		const res = await Client.post(
			`/api/student/submit/answer/${/*room id*/ 10}`,
			{ response: answer, question_id: question.id, student_id: 1 }
		)
		console.log(res.data)
		setSubmitted(false)
		setAnswered(false)
		setAnswered(true)
	}

	useEffect(() => {
		if (submitted) {
			logAnswer()
		}
	}, [submitted])

	useEffect(() => {
		//on new question
		socket.on('new-question', (data) => {
			setQuestion({ ...data.question, choices: data.choices })
			console.log(data)
			setAnswered(false)
		})

		let hideAnnouncementInterval

		socket.on('room-announcement', (data) => {
			setAnnoucement(data)
			setShowAnnnouncement(true)
			hideAnnouncementInterval = setTimeout(() => {
				setShowAnnnouncement(false)
			}, 10000)
		})

		return () => {
			clearTimeout(hideAnnouncementInterval)
			socket.removeListener('new-question')
			socket.removeListener('room-announcement')
		}
	}, [socket]) //on socket receive

	return (
		<div className={styles.container}>
			{showAnnouncement ? <StudentPopUp text={announcement} /> : ''}
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
			<div className={styles['question']}>
				<h2 className={styles.question}>{question.question}</h2>
			</div>
			<div className={styles['body']}>
				<div className={styles['answer-box']}>
					<AnswerBox
						question={question}
						submitAnswer={submitAnswer}
						submitted={answered}
						answer={answer}
						setAnswer={setAnswer}
					/>
				</div>
				<br />
				<Chatbox name={'An'} socket={socket} />
			</div>
		</div>
	)
}
