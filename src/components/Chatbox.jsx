import { useState, useEffect } from 'react'
import styles from '../styles/components/Chat.module.css'
import { useRef } from 'react'

export default function Chatbox({ name, socket }) {
	let [chatMessages, setChatmessages] = useState([])
	let [input, setInput] = useState('')
	const chatBottom = useRef(null)

	function updateMessage(message) {
		setChatmessages((currentState) => [...currentState, message])
	}

	function scrollToBottom() {
		chatBottom.current?.scrollIntoView({ behavior: 'smooth' })
	}

	function handleSubmit(e) {
		e.preventDefault()
		socket.emit('send-message', { name: name, message: input })
		setInput('')
	}

	function handleChange(e) {
		setInput(e.target.value)
	}
	useEffect(() => {
		if (socket != undefined) {
			socket.on('receive-message', (data) => {
				updateMessage(data)
				scrollToBottom()
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
				Chat messages show Here
				{chatMessages.map((msg) => (
					<div className={styles['chatline']}>
						{`${msg.name}: ${msg.message}`} <br />
					</div>
				))}
				<div ref={chatBottom}> </div>
			</div>
			<form onSubmit={handleSubmit} className={styles['form-wrapper']}>
				<input
					className={styles.form}
					type='text'
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
