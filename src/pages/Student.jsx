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
			<div className={styles['header']}>
				<h2>Question here</h2>
			</div>
			<div className={styles['body']}>
				<div className={styles['answer-box']}>
					<AnswerBox
						question={question}
						submitAnswer={submitAnswer}
						submitted={answered}
						answer={answer}
						setAnswer={setAnswer}
					/>
				</div>
				<br />
				<Chatbox name={'An'} socket={socket} />
			</div>
		</div>
	)
}
