import styles from '../styles/pages/Student.module.css'
import io from 'socket.io-client'
import Chatbox from '../components/Chatbox'
const socket = io('http://localhost:3001')

export default function Student() {
	function doSomething() {
		socket.emit('student-message', { message: 'student' })
	}
	return (
		<div className={styles.container}>
			<Chatbox name={'An'} socket={socket} />
			<button onClick={doSomething}>Test backend msg</button>
		</div>
	)
}
