import { useEffect, useState } from 'react'
import ViewAllAnswerBox from '../components/ViewAllAnswerBox'
import Chatbox from '../components/Chatbox'
import styles from '../styles/pages/Host.module.css'
import io from 'socket.io-client'
import axios from 'axios'

export default function Host() {
	const [formState, setFormState] = useState([])
	const [connected, setConnected] = useState(false)
	let socket = io('http://localhost:3001')
	const [room, setRoom] = useState({
		id: 1,
		owner_id: 1,
		join_key: 'A2S56X',
		isActive: true,
	})

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let res = await axios.post(`/host`, formState)
		console.log('hola')
		console.log(res.data)
		setFormState([])
		// getBanks()
	}

	//socketIO listen for message
	useEffect(() => {}, [socket])

	//Page Load UseEffect
	useEffect(() => {}, [])
	return (
		<div>
			<ViewAllAnswerBox socket={socket} />
			<h2>Host</h2>
			<div className={styles.container}>
				<div id='rectangle' className={styles.options}>
					<div className={styles.wrapper}>
						<div id='rectangle' className={styles.options}>
							Write Questions Here
						</div>

						<div id='rectangle' className={styles.options}>
							Text Field for Option 1
						</div>

						<div id='rectangle' className={styles.options}>
							Text Field for Option 2
						</div>

						<div id='rectangle' className={styles.options}>
							Text Field for Option 3
						</div>

						<div id='rectangle' className={styles.options}>
							Text Field for Option 4
						</div>

						<button onClick={handleSubmit}>Submit</button>
					</div>
				</div>
			</div>
			{
				//Chat box here
			}
			<Chatbox name={'teacher'} socket={socket} />
		</div>
	)
}
