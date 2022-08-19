import { useState, useEffect } from 'react'
import styles from '../styles/components/Chat.module.css'
import { useRef } from 'react'
import sendsound from '../assets/chatSend.mp3'
import recievesound from '../assets/chatArrival.mp3'

export default function Chatbox({ name, socket, roomId }) {
	const [chatMessages, setChatmessages] = useState([])

	const [input, setInput] = useState('')
	const chatBottom = useRef(null)

	const [sendSound] = useState(new Audio(sendsound))
	const [recieveSound] = useState(new Audio(recievesound))

	function updateMessage(message) {
		setChatmessages((currentState) => [...currentState, message])
	}

	function scrollToBottom() {
		chatBottom.current?.scrollIntoView({ behavior: 'smooth' })
	}

	function handleSubmit(e) {
		sendSound.volume = 0.07
		e.preventDefault()
		socket.emit('send-message', { name: name, message: input, room_id: roomId })
		setInput('')
		sendSound.play()
	}

	function handleChange(e) {
		setInput(e.target.value)
	}
	useEffect(() => {
		recieveSound.volume = 0.07
		if (socket != undefined) {
			socket.on('receive-message', (data) => {
				updateMessage(data)
				scrollToBottom()
				recieveSound.play()
			})
		}

		return () => {
			socket.removeListener('receive-message')
		}
	}, [socket])

	useEffect(() => {
		scrollToBottom()
	}, [chatMessages])

	return (
		<div className={styles.container}>
			<div className={styles.chatbox}>
				{chatMessages.map((msg, i) => (
					<div key={i} className={styles['chatline']}>
						{`${msg.name}: ${msg.message}`} <br />
					</div>
				))}
				<div ref={chatBottom}> </div>
			</div>
			<form onSubmit={handleSubmit} className={styles['form-wrapper']}>
				<input
					className={styles.form}
					type='text'
					placeholder='Send Messages Here'
					name='chatInput'
					onChange={handleChange}
					value={input}
				/>
				<button className={styles.button} type='submit'>
					SEND
				</button>
			</form>
		</div>
	)
}
