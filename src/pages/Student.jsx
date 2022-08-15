import styles from '../styles/pages/Student.module.css'
import Chatbox from '../components/Chatbox'
import Client from '../util/api'
import { useState, useEffect } from 'react'
import AnswerBox from '../components/AnswerBox'

export default function Student({ socket, logout, accountInfo, user }) {
	let [answered, setAnswered] = useState(false)
	let [question, setQuestion] = useState(null)
	let [answer, setAnswer] = useState('')
	let [submitted, setSubmitted] = useState(false)

	function submitAnswer(e) {
		e.preventDefault()
		if (!answered) {
			setSubmitted(true)
			console.log('summited answer')
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

		socket.on('room-announcement', (data) => {
			console.log(data)
		})

		return () => {
			socket.removeListener('new-question')
		}
	}, [socket]) //on socket receive

	return (
		<div className={styles.container}>
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
			<div className={styles['question']}>
				<h2 className={styles.question}>Question will populate here</h2>
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
