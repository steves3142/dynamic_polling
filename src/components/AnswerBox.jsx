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
		}
	}

	return <div>{!submitted && question ? displayAnswerArea() : <></>}</div>
}
