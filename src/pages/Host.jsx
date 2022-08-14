import { useEffect, useState } from 'react'
import Chatbox from '../components/Chatbox'
import HostMainDisplay from '../components/HostMainDisplay'
import Client from '../util/api'
import styles from '../styles/pages/Host.module.css'
import axios from 'axios'
import { getRoomList } from '../util/auth'

export default function Host({ socket, user, accountInfo }) {
	const [questionFormState, setFormState] = useState([])
	const [connected, setConnected] = useState(false)
	//0 = empty, 1 = new question, 2 = display fr log, 3 = question log, 4 =  anouncement, 5 = new Room
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
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						<div className={styles['room']}>room1</div>
						{roomList.map((room) => (
							<div className={styles['room']}>{room.name}</div>
						))}
						<div onClick={() => setMainDisplay(5)} className={styles['room']}>
							Add New Room
						</div>
					</div>
				</div>
			</div>
			<div className={styles['body']}>
				<div className={styles['side-bar']}>
					<div className={styles['pseudo-button']}>New Question</div>
					<div className={styles['pseudo-button']}>Room Announcement</div>
					<div className={styles['pseudo-button']}>Hide/Show Answers</div>
					<div className={styles['review-dates']}>
						<input
							type='text'
							className={styles['review-date']}
							name='start-date'
							placeholder='DD/YY'
						/>
						<h4>to</h4>
						<input
							type='text'
							className={styles['review-date']}
							name='start-date'
							placeholder='DD/YY'
						/>
					</div>
					<div className={styles['review-button']}>Review</div>
					<div className={styles['logout-button']}>
						<button className={styles['logout']}>Log Out</button>
					</div>
				</div>
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
