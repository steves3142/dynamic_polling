import React from 'react'
import QuestionForm from './QuestionForm'
import ViewAllAnswerBox from './ViewAllAnswerBox'
import styles from '../styles/components/HostMainDisplay.module.css'
import RoomForm from './RoomForm'
import Announcement from './Announce'
import QuestionLibraryManager from './QuestionLibraryManager'

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
	questionFromAction,
	roomList,
}) {
	function getDisplay() {
		if (mainDisplayState == 5) {
			return (
				<RoomForm
					user={user}
					accountInfo={accountInfo}
					addToRoomList={addToRoomList}
					setMainDisplay={setMainDisplay}
					roomList={roomList}
				/>
			)
		}

		//no room selected
		if (!room) {
			return <div>Please Select A Room</div>
		}

		//0 = empty, 1 = new question, 2 = question library, 3 = question log, 4 = annoucement, 5 = new room,
		switch (mainDisplayState) {
			case 0:
				return <div></div>
			case 1:
				return (
					<QuestionForm
						room={room}
						setMainDisplay={setMainDisplay}
						setAnswers={setAnswers}
						setCurrentQuestion={setCurrentQuestion}
						action={questionFromAction}
						currentQuestion={currentQuestion}
					/>
				)
			case 2:
				return <QuestionLibraryManager />
			case 3:
				return (
					<ViewAllAnswerBox
						socket={socket}
						setAnswers={setAnswers}
						answers={answers}
						currentQuestion={currentQuestion}
					/>
				)
			case 4:
				return (
					<Announcement
						socket={socket}
						room={room}
						setMainDisplay={setMainDisplay}
					/>
				)
		}
	}
	return <div className={styles['wrapper']}>{getDisplay()}</div>
}
