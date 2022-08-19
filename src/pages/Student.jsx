import styles from '../styles/pages/Student.module.css'
import Chatbox from '../components/Chatbox'
import Client from '../util/api'
import { useState, useEffect } from 'react'
import AnswerBox from '../components/AnswerBox'
import StudentPopUp from '../components/StudentPopUp'
import { useAccountInfoContext, useUserContext } from '../util/useUserProvider'
import sendanswer from '../assets/answerSend.mp3'
import announcesound from '../assets/announcement.mp3'
import waitingsound from '../assets/waitingClient.mp3'

export default function Student({ socket, logout, hasRoom }) {
	const { user } = useUserContext()
	const { accountInfo } = useAccountInfoContext()
	const [answered, setAnswered] = useState(false)
	const [announcement, setAnnoucement] = useState('')
	const [showAnnouncement, setShowAnnnouncement] = useState(false)
	const [question, setQuestion] = useState(null)
	const [answer, setAnswer] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [chatLoaded, setChatLoaded] = useState(false)
	const [room, setRoom] = useState(null)
	const [sendAnswer] = useState(new Audio(sendanswer))
	const [announceSound] = useState(new Audio(announcesound))
	const [waitingSound] = useState(new Audio(waitingsound))

	function submitAnswer(e) {
		sendAnswer.volume = 0.2
		e.preventDefault()
		if (!answered) {
			setSubmitted(true)
			sendAnswer.play()
		}
	}

	async function logAnswer() {
		const res = await Client.post(`/api/student/submit/answer/${accountInfo.room_id}`, {
			response: answer,
			question_id: question.id,
			student_id: accountInfo.id,
		})
		setSubmitted(false)
		setAnswered(true)
	}

	async function getRoom() {
		let res = await Client.get(`/api/room/rooms/id/${accountInfo.room_id}`)
		setRoom(res.data)
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
		waitingSound.volume = 0.01
		if (answered) {
			waitingSound.play()
			waitingSound.addEventListener('ended', () => {
				waitingSound.currentTime = 0
				waitingSound.play()
			})
		} else {
			waitingSound.pause()
			waitingSound.currentTime = 0
		}
		return () => {
			waitingSound.removeEventListener('ended', () => {
				waitingSound.currentTime = 0
				waitingSound.play()
			})
		}
	}, [answered])

	useEffect(() => {
		//on new question
		socket.on('new-question', (data) => {
			setQuestion({ ...data.question, choices: data.choices })
			clearState()
		})

		//update question
		socket.on('updated-question', (data) => {
			setQuestion({ ...data.question, choices: data.choices })
			clearState()
		})

		let hideAnnouncementInterval

		socket.on('room-announcement', (data) => {
			setAnnoucement(data)
			setShowAnnnouncement(true)
			hideAnnouncementInterval = setTimeout(() => {
				setShowAnnnouncement(false)
			}, 10000)
			announceSound.play()
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
			getRoom()
		}
	}, [hasRoom])

	return (
		<div className={styles.container}>
			<StudentPopUp text={announcement} showAnnouncement={showAnnouncement} />
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<div className={styles['room-name']}>{room ? room.name : ''} </div>
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
					<Chatbox name={user.display_name} socket={socket} roomId={accountInfo.room_id} />
				) : (
					'Loading Please wait'
				)}
			</div>
		</div>
	)
}
