import styles from '../styles/pages/Student.module.css'
import Chatbox from '../components/Chatbox'
import { useState, useEffect } from 'react'
import AnswerBox from '../components/AnswerBox'

export default function Student({ socket }) {
	let [answered, setAnswered] = useState(false)
	let [question, setQuestion] = useState(null)
	let [answer, setAnswer] = useState('')

	function submitAnswer(e) {
		e.preventDefault()
		if (!answered) {
			console.log('summited answer')
			setAnswer('')
			setAnswered(true)
		} else {
			console.log('Already submitted')
		}
	}

	//for Testing purpose
	function newQuestion() {
		console.log('new question')
		const question = {
			id: 1,
			room_id: 1,
			question: 'Some Question',
			type: 'FR',
			choices: [
				{ choice: 'option 1' },
				{ choice: 'option 2' },
				{ choice: 'option 3' },
				{ choice: 'option 4' },
			],
		}
		setAnswer('')
		setQuestion(question)
		setAnswered(false)
	}

	useEffect(() => {
		//on new question
		socket.on('new-question', (data) => {
			setQuestion(data)
			console.log(data)
			setAnswered(false)
		})
	}, [socket]) //on socket receive

	return (
		<div className={styles.container}>
			<h2>Question here</h2>
			<AnswerBox
				question={question}
				submitAnswer={submitAnswer}
				submitted={answered}
				answer={answer}
				setAnswer={setAnswer}
			/>
			<button onClick={newQuestion}>new question</button>
			<br />
			<Chatbox name={'An'} socket={socket} />
		</div>
	)
}
