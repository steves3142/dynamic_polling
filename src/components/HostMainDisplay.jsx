import React from 'react'
import NewQuestionForm from './NewQuestionForm'
import ViewAllAnswerBox from './ViewAllAnswerBox'
import styles from '../styles/components/HostMainDisplay.module.css'
import RoomForm from './RoomForm'
import Announcement from './Announce'

export default function HostMainDisplay({
	user,
	addToRoomList,
	accountInfo,
	room,
	mainDisplayState,
	socket,
	setMainDisplay,
	setAnswers,
	answers,
	setCurrentQuestion,
	currentQuestion,
}) {
	function getDisplay() {
		//0 = empty, 1 = new question, 2 = display fr log, 3 = question log, 4 = annoucement, 5 = new room
		switch (mainDisplayState) {
			case 0:
				return <>{JSON.stringify(currentQuestion)}</>
			case 1:
				return (
					<NewQuestionForm
						room={room}
						setMainDisplay={setMainDisplay}
						setAnswers={setAnswers}
						setCurrentQuestion={setCurrentQuestion}
					/>
				)
			case 2:
			case 3:
				return (
					<ViewAllAnswerBox
						socket={socket}
						setAnswers={setAnswers}
						answers={answers}
					/>
				)
			case 4:
				return <Announcement socket={socket} setMainDisplay={setMainDisplay} />
			case 5:
				return (
					<RoomForm
						user={user}
						accountInfo={accountInfo}
						addToRoomList={addToRoomList}
						setMainDisplay={setMainDisplay}
					/>
				)
		}
	}
	return <div className={styles['wrapper']}>{getDisplay()}</div>
}
