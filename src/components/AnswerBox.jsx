import styles from '../styles/pages/Student.module.css'
export default function AnswerBox({
	question,
	submitAnswer,
	submitted,
	answer,
	setAnswer,
}) {
	function handleAnswerUpdate(e) {
		setAnswer(e.target.value)
	}

	function displayAnswerArea() {
		if (question.type == 'FR') {
			return (
				<form onSubmit={submitAnswer}>
					<textarea
						name='answer-area'
						value={answer}
						onChange={(e) => handleAnswerUpdate(e)}
						cols='30'
						rows='10'
						placeholder='Answer here'
					/>

					<br />
					<button type='submit'>Submit</button>
				</form>
			)
		} else {
			//return MC form here
			return (
				<div>
					{question.choices.map((choice, index) => (
						<div
							className={
								answer !== '' && answer == index ? styles.selected : ''
							}
							onClick={() => {
								setAnswer(index)
							}}>
							{choice.choice}
						</div>
					))}
					<button onClick={submitAnswer}>submit</button>
				</div>
			)
		}
	}

	return <div>{!submitted && question ? displayAnswerArea() : <></>}</div>
}
