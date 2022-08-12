import { useState, useEffect } from 'react'

export default function Chatbox({ name, socket }) {
	let [chatMessages, setChatmessages] = useState([])
	let [input, setInput] = useState('')

	function updateMessage(message) {
		setChatmessages((currentState) => [...currentState, message])
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
		})
	}, [socket])

	return (
		<div>
			<div>
				Chat messages show Here
				{chatMessages.map((msg) => (
					<p>
						{`${msg.name}: ${msg.message}`} <br />
					</p>
				))}
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
