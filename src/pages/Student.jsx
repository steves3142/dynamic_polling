import styles from '../styles/pages/Student.module.css'
import Chatbox from '../components/Chatbox'
import Client from '../util/api'
import { useState, useEffect } from 'react'
import AnswerBox from '../components/AnswerBox'
import StudentPopUp from '../components/StudentPopUp'

export default function Student({
	socket,
	logout,
	accountInfo,
	user,
	hasRoom,
}) {
	const [answered, setAnswered] = useState(false)
	const [announcement, setAnnoucement] = useState('')
	const [showAnnouncement, setShowAnnnouncement] = useState(false)
	const [question, setQuestion] = useState(null)
	const [answer, setAnswer] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [chatLoaded, setChatLoaded] = useState(false)

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
			`/api/student/submit/answer/${accountInfo.room_id}`,
			{
				response: answer,
				question_id: question.id,
				student_id: accountInfo.id,
			}
		)
		console.log(res.data)
		setSubmitted(false)
		setAnswered(true)
	}

	function clearState() {
		setAnswer('')
		setSubmitted(false)
		setAnswered(false)
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
			clearState()
		})

		//update question
		socket.on('updated-question', (data) => {
			setQuestion({ ...data.question, choices: data.choices })
			console.log('Updated question')
			console.log(data)
			clearState()
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

	//onPage load
	useEffect(() => {
		if (accountInfo.room_id != null) {
			socket.emit('join-room', accountInfo.room_id)
			setChatLoaded(true)
		}
	}, [hasRoom])

	return (
		<div className={styles.container}>
			<StudentPopUp text={announcement} showAnnouncement={showAnnouncement} />
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<div className={styles['welcome']}>Welcome to DynaSoar Polling </div>
				<button onClick={logout} className={styles['logout']}>
					Log Out
				</button>
			</div>
			<div className={styles['question']}>
				<h2 className={styles.question}>{question ? question.question : ''}</h2>
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
				{chatLoaded ? (
					<Chatbox
						name={user.display_name}
						socket={socket}
						roomId={accountInfo.room_id}
					/>
				) : (
					'Loading Please wait'
				)}
			</div>
		</div>
	)
}
