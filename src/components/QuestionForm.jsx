import { useEffect, useState } from 'react'
import Client from '../util/api'
import styles from '../styles/components/NewQuestionForm.module.css'

export default function QuestionForm({
	room,
	setMainDisplay,
	setAnswers,
	currentQuestion,
	setCurrentQuestion,
	action,
}) {
	let initialForm =
		action == 'NEW'
			? {
					question: '',
					room_id: room.id,
					type: 'FR',
			  }
			: currentQuestion.question

	let initialChoices =
		action == 'NEW'
			? [...Array(4)].map(() => ({
					choice: '',
			  }))
			: currentQuestion.choices

	const [formState, setFormState] = useState(initialForm)
	const [choices, setChoices] = useState(initialChoices)

	const handleChange = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		let res
		if (action == 'NEW') {
			res = await Client.post(`/api/host/submit/question/${room.id}`, {
				question: formState,
				choices: choices,
			})
			setFormState(initialForm)
			setChoices([[...Array(4)].map(() => '')])
			// clear out old answers recieved array when sending new question
			setAnswers([])
		} else {
			res = await Client.put(`/api/host/update/${currentQuestion.question.id}`, {
				question: formState,
				choices: choices,
			})
		}
		setCurrentQuestion({
			question: res.data.question,
			choices: res.data.choices,
		})

		//back to main disp
		setMainDisplay(3)
	}

	const addOption = () => {
		setChoices((currentState) => [...currentState, ''])
	}

	const removeOption = () => {
		let temp = [...choices]
		temp.pop()
		setChoices(temp)
	}

	const numOptionsChange = (e) => {
		let temp = [...choices]
		let target = parseInt(e.target.value)
		if (target > choices.length) {
			while (temp.length < target) {
				temp.push('')
			}
		} else {
			while (temp.length > target) {
				temp.pop()
			}
		}
		setChoices(temp)
	}

	const handleOptionsChange = (e) => {
		let temp = [...choices]
		temp[parseInt(e.target.id)].choice = e.target.value
		setChoices(temp)
	}

	useEffect(() => {
		setFormState(initialForm)
		setChoices(initialChoices)
	}, [action])

	const getForm = () => {
		if (formState.type == 'MC') {
			return (
				<div className={styles['MC-form']}>
					<div className={styles['nums-wrapper']}>
						<input
							onChange={numOptionsChange}
							className={styles['options']}
							type='text'
							value={choices.length}
						/>
						<div className={styles['increment-container']}>
							<input onClick={addOption} type='button' value='+' />
							<input onClick={removeOption} type='button' value='-' />
						</div>
					</div>
					{choices.map((choice, index) => (
						<input
							onChange={handleOptionsChange}
							type='text'
							id={index}
							value={choices[index].choice}
							placeholder={`option ${index + 1}`}
							className={styles['input']}
						/>
					))}
				</div>
			)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles['form']}>
				<select
					className={styles['drop-down-component']}
					defaultValue={formState.type}
					name='type'
					onChange={handleChange}
					required>
					<option value={'FR'}>Free Response</option>
					<option value={'MC'}>Multiple Choice</option>
				</select>
				<input
					className={styles['input']}
					type='text'
					name='question'
					placeholder='Enter Question Here'
					onChange={handleChange}
					value={formState.question}
				/>
				{getForm()}
			</div>
			<div onClick={handleSubmit} className={styles['bottom-div']}>
				<div className={styles['pseudo-button']}>Submit</div>
			</div>
		</div>
	)
}
