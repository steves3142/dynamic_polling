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
}) {
	function getDisplay() {
		//0 = empty, 1 = new question, 2 = display fr log, 3 = question log
		switch (mainDisplayState) {
			case 0:
				return <>Empty</>
			case 1:
				return <NewQuestionForm room={room} />
			case 2:
			case 3:
				return <ViewAllAnswerBox socket={socket} />
			case 4: 
				return <Announcement /> 
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
