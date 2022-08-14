import { useEffect, useState } from 'react'
import Chatbox from '../components/Chatbox'
import HostMainDisplay from '../components/HostMainDisplay'

import styles from '../styles/pages/Host.module.css'
import axios from 'axios'
import { getRoomList } from '../util/auth'

export default function Host({ socket, user }) {
	const [questionFormState, setFormState] = useState([])
	const [connected, setConnected] = useState(false)
	//0 = empty, 1 = new question, 2 = display fr log, 3 = question log, 4 =  anouncement
	const [mainDisplay, setMainDisplay] = useState(1)
	const [roomList, setRoomList] = useState([])

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

	const questionFormHandleChange = (event) => {
		setFormState({
			...questionFormState,
			[event.target.id]: event.target.value,
		})
	}

	const questionFormHandleSubmit = async (event) => {
		event.preventDefault()
		let res = await axios.post(
			`http://localhost:3001/api/host/submit/question`,
			questionFormState
		)
		console.log('hola')
		console.log(res.data)
		setFormState(initialForm)
	}

	const loadRoomList = async () => {
		console.log(user)
		if (user != null) {
			const roomList = await getRoomList(user.id)
			setRoomList(roomList)
		}
	}

	//on load
	useEffect(() => {
		if (user) {
			loadRoomList()
		}
	}, [user])

	return (
		<div className={styles.wrapper}>
			<div className={styles['header']}>
				<img className={styles.logo} src='https://i.imgur.com/4Za1ekP.png'/>
				<div className={styles['room-info-wrapper']}>
					<div className={styles['pseudo-button']}>OPEN ROOM</div>
					<div className={styles['room-list']}>
						<p className={styles['text']}>Room List</p>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
					</div>
				</div>
			</div>
			<div className={styles['body']}>
				<div className={styles['side-bar']}>
					<div className={styles['pseudo-button']}>New Question</div>
					<div className={styles['pseudo-button']}>Room Announcement</div>
					<div className={styles['pseudo-button']}>Hide/Show Answers</div>
					<div className={styles['review-dates']} >
					<input type='text' className={styles['review-date']}/>
					<h4>to</h4>
					<input type='text' className={styles['review-date']}/>
					</div>
					<div className={styles['review-button']}>Review</div>
				</div>
				<div className={styles['body-display']}>
					<div className={styles['main-display-wrapper']}>
						<HostMainDisplay
							room={room}
							socket={socket}
							mainDisplayState={mainDisplay}
							questionFormState={questionFormState}
							questionFormHandleChange={questionFormHandleChange}
							questionFormHandleSubmit={questionFormHandleSubmit}
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
