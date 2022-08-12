import styles from '../styles/pages/Student.module.css'
import io from 'socket.io-client'
import Chatbox from '../components/Chatbox'
import { useState } from 'react'

const socket = io('http://localhost:3001')

export default function Student() {
	let [answered, setAnswered] = useState(false)
	let [question, setQuestion] = useState(null)

	return (
		<div className={styles.container}>
			<br />
			<Chatbox name={'An'} socket={socket} />
		</div>
	)
}
