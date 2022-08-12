import { useState, useEffect } from 'react'

export default function ViewAllAnswerBox({ socket }) {
	const [answers, setAnswer] = useState([])
	function updateAnswersList(newAnswer) {
		setAnswer((currentState) => [...currentState, newAnswer])
	}

	useEffect(() => {
		socket.on('new_answer', (answer) => {
			console.log(answer)
			updateAnswersList(answer)
		})
	}, [socket])

	function sendAnswer() {
		socket.emit('newAnswer', {
			answer: {
				id: 1,
				student_id: 1,
				response: `${Math.floor(Math.random() * 5)}`,
			},
			room: 10,
		})
	}
	return (
		<div>
			<div>
				<h3>Answer log here</h3>
				{answers.map((answer) => (
					<div>
						{answers.student_id}: {answer.response}
					</div>
				))}
			</div>
			<button onClick={sendAnswer}>send answer</button>
		</div>
	)
}
