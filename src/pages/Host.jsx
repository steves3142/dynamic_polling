import { useEffect, useState } from 'react'
import ViewAllAnswerBox from '../components/ViewAllAnswerBox'
import Chatbox from '../components/Chatbox'
import NewQuestionForm from '../components/NewQuestionForm'
import styles from '../styles/pages/Host.module.css'
import axios from 'axios'

export default function Host({ socket }) {
	const [questionFormState, setFormState] = useState([])
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
		setFormState({
			...questionFormState,
			[event.target.id]: event.target.value,
		})
	}

	const handleSubmit = async (event) => {
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
		<div>
			<ViewAllAnswerBox socket={socket} />
			<h2>Host</h2>
			<NewQuestionForm
				formState={questionFormState}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{
				//Chat box here
			}
			<Chatbox name={'teacher'} socket={socket} />
		</div>
	)
}
