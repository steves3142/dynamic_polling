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
		socket.on('receive-message', (data) => {
			updateMessage(data)
			scrollToBottom()
		})
	}, [socket])

	return (
		<div>
			<div className={styles.chatbox}>
				Chat messages show Here
				{chatMessages.map((msg) => (
					<div>
						<p>
							{`${msg.name}: ${msg.message}`} <br />
						</p>
					</div>
				))}
				<div ref={chatBottom}></div>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='chatInput'
					onChange={handleChange}
					value={input}
				/>
				<button type='submit'>send</button>
			</form>
		</div>
	)
}
