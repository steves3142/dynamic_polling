import { useEffect, useState } from 'react'
import Chatbox from '../components/Chatbox'
import HostMainDisplay from '../components/HostMainDisplay'
import Client from '../util/api'
import styles from '../styles/pages/Host.module.css'
import { getRoomList } from '../util/auth'
import HostSideBar from '../components/HostSideBar'

export default function Host({ socket, user, accountInfo, logout }) {
	const [connected, setConnected] = useState(false)
	//0 = empty, 1 = new question, 2 = display fr log, 3 = question log, 4 =  anouncement, 5 = new Room
	const [mainDisplay, setMainDisplay] = useState(0)
	const [roomList, setRoomList] = useState([])
	const [answers, setAnswers] = useState([])
	const [currentQuestion, setCurrentQuestion] = useState(null)
	const [questionList, setQuestionList] = useState([])

	//Not connected to socket yet but will use for test route
	const [room, setRoom] = useState({
		id: 1,
		owner_id: 1,
		join_key: 'A2S56X',
		isActive: true,
	})

	const initialForm = {
		question: '',
		room_Id: '10',
		type: 'MC',
	}

	const loadRoomList = async () => {
		if (user != null) {
			const roomList = await getRoomList(user.id)
			console.log(roomList)
			setRoomList(roomList)
		}
	}

	const addToRoomList = (room) => {
		let temp = [...roomList, room]
		setRoomList(temp)
	}

	function updateAnswersList(newAnswer) {
		setAnswers((currentState) => [...currentState, newAnswer])
	}

	useEffect(() => {
		socket.on('new-answer', (answer) => {
			console.log(answer)
			updateAnswersList(answer)
		})

		return () => {
			socket.removeListener('new-answer')
		}
	}, [socket])

	//on load
	useEffect(() => {
		if (user) {
			loadRoomList()
		}
	}, [user])

	return (
		<div className={styles.wrapper}>
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<div className={styles['room-info-wrapper']}>
					<div className={styles['pseudo-button']}>OPEN ROOM</div>
					<div className={styles['room-list']}>
						<p className={styles['text']}>Room List</p>
						{roomList.map((room) => (
							<div key={room.id} className={styles['room']}>
								{room.name}
							</div>
						))}
						<div
							onClick={() => setMainDisplay(5)}
							className={styles['new-room']}>
							Add New Room
						</div>
					</div>
				</div>
			</div>
			<div className={styles['body']}>
				<HostSideBar
					setMainDisplay={setMainDisplay}
					logout={logout}
					setQuestionList={setQuestionList}
					questionList={questionList}
				/>
				<div className={styles['body-display']}>
					<div className={styles['main-display-wrapper']}>
						<HostMainDisplay
							setMainDisplay={setMainDisplay}
							addToRoomList={addToRoomList}
							accountInfo={accountInfo}
							room={room}
							socket={socket}
							mainDisplayState={mainDisplay}
							user={user}
							answers={answers}
							setAnswers={setAnswers}
							setCurrentQuestion={setCurrentQuestion}
							currentQuestion={currentQuestion}
						/>
					</div>
					<div className={styles['chatbox-wrapper']}>
						<Chatbox name={'teacher'} socket={socket} />
					</div>
				</div>
			</div>
		</div>
	)
}
