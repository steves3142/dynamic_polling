import { useEffect, useState } from 'react'
import ViewAllAnswerBox from '../components/ViewAllAnswerBox'
import Chatbox from '../components/Chatbox'
import styles from '../styles/pages/Host.module.css'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io('http://localhost:3001')

export default function Host() {
	const [formState, setFormState] = useState([])
	const [connected, setConnected] = useState(false)

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


	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let res = await axios.post(`http://localhost:3001/api/host/submit/question`, formState)
		console.log('hola')
		console.log(res.data)
		setFormState(initialForm)
	}

	//socketIO listen for message
	useEffect(() => { }, [socket])

	return (
		<div>
			<ViewAllAnswerBox socket={socket} />
			<h2>Host</h2>
			<div className={styles.container}>
				<div id="rectangle" className={styles.options}>

					<div className={styles.wrapper}>
						<form onSubmit={handleSubmit}>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Your Question Here</label>
								<input type="text" id="question" onChange={handleChange} value={formState.question} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type First Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Second Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Third Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Fourth Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>
							<button onClick={handleSubmit}>Submit</button>
						</form>
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
