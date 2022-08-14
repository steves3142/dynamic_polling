import React from 'react'
import NewQuestionForm from './NewQuestionForm'
import ViewAllAnswerBox from './ViewAllAnswerBox'
import styles from '../styles/components/HostMainDisplay.module.css'

export default function HostMainDisplay({
	room,
	mainDisplayState,
	questionFormState,
	questionFormHandleSubmit,
	questionFormHandleChange,
	socket,
}) {
	function getDisplay() {
		//0 = empty, 1 = new question, 2 = display fr log, 3 = question log
		switch (mainDisplayState) {
			case 0:
				return <>Empty</>
			case 1:
				return (
					<NewQuestionForm
						room={room}
						formState={questionFormState}
						handleChange={questionFormHandleChange}
						handleSubmit={questionFormHandleSubmit}
					/>
				)
			case 2:
			case 3:
				return <ViewAllAnswerBox socket={socket} />
		}
	}

	return <div className={styles['wrapper']}>{getDisplay()}</div>
}
