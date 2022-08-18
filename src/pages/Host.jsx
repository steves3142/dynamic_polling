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

	const [currRoom, setRoom] = useState(null)
	const [questionFromAction, setQuestionFormAction] = useState('NEW')

	const loadRoomList = async () => {
		console.log('called')
		if (user && accountInfo) {
			const roomList = await getRoomList(accountInfo.id)
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

	function joinRoom(room) {
		setRoom(room)
		// Join Room when room is selected
		console.log(`joining room ${room.id}`)
		socket.emit('join-room', room.id)

		//clearing previous states
		setQuestionList([])
		setCurrentQuestion(null)
		setAnswers([])
		setMainDisplay(0)
		setQuestionFormAction('NEW')
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
	}, [user, accountInfo])

	return (
		<div className={styles.wrapper}>
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png' />
				<div className={styles['header-right']}>
					<div className={styles['room-info']}>
						<div className={styles['join-key-info']}>
							<div className={styles['room-key-title']}>Room Code : </div>
							<div className={styles['room-key']}>
								{currRoom ? currRoom.join_key : ''}
							</div>
						</div>
					</div>
					<div className={styles['room-info-wrapper']}>
						<div className={styles['pseudo-button']}>Open Room</div>
						<div
							className={[
								styles['room-list'],
								currRoom ? styles['selected'] : '',
							].join(' ')}>
							<p className={styles['text']}>
								{currRoom ? currRoom.name : 'Room List'}
							</p>
							{roomList.map((room) => (
								<div
									onClick={() => {
										joinRoom(room)
									}}
									key={room.id}
									className={[
										styles['room'],
										currRoom == room ? styles['selected'] : '',
									].join(' ')}>
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
			</div>
			<div className={styles['body']}>
				<HostSideBar
					setMainDisplay={setMainDisplay}
					logout={logout}
					setQuestionList={setQuestionList}
					setQuestionFormAction={setQuestionFormAction}
					questionList={questionList}
					currentQuestion={currentQuestion}
					setCurrentQuestion={setCurrentQuestion}
					room={currRoom}
					setAnswers={setAnswers}
					mainDisplay={mainDisplay}
				/>
				<div className={styles['body-display']}>
					<div className={styles['main-display-wrapper']}>
						<HostMainDisplay
							setMainDisplay={setMainDisplay}
							addToRoomList={addToRoomList}
							accountInfo={accountInfo}
							room={currRoom}
							socket={socket}
							mainDisplayState={mainDisplay}
							user={user}
							answers={answers}
							setAnswers={setAnswers}
							setCurrentQuestion={setCurrentQuestion}
							currentQuestion={currentQuestion}
							questionFromAction={questionFromAction}
							roomList={roomList}
						/>
					</div>
					<div className={styles['chatbox-wrapper']}>
						{currRoom ? (
							<Chatbox
								name={user.display_name}
								socket={socket}
								roomId={currRoom.id}
							/>
						) : (
							'Please choose a Room to for Functionality'
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
