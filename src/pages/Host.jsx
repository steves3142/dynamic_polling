import { useEffect, useState } from 'react'
import ViewAllAnswerBox from '../components/ViewAllAnswerBox'
import Chatbox from '../components/Chatbox'
import HostMainDisplay from '../components/HostMainDisplay'
import styles from '../styles/pages/Host.module.css'
import axios from 'axios'

export default function Host({ socket }) {
	const [questionFormState, setFormState] = useState([])
	const [connected, setConnected] = useState(false)
	//0 = empty, 1 = new question, 2 = display fr log, 3 = question log
	const [mainDisplay, setMainDisplay] = useState(2)

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

	//socketIO listen for message
	useEffect(() => {}, [socket])

	return (
		<div className={styles.wrapper}>
			<div className={styles['header']}>
				<h2>Host</h2>
			</div>
			<div className={styles['body']}>
				<div className={styles['side-bar']}>SideBar</div>
				<div className={styles['body-display']}>
					<div className={styles['main-display-wrapper']}>
						<HostMainDisplay
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
