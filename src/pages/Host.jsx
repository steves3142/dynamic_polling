import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Host.module.css'
import axios from 'axios'

export default function Host() {

	const initialForm = { 
		question: '', 
		room_Id: '10',
		type: 'MC',
	  }
	const [formState, setFormState] = useState(initialForm)

	const handleChange = event => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};

	async function handleSubmit(event) {
		event.preventDefault();
		let res = await axios.post(`http://localhost:3001/api/host/submit/question`, formState)
		console.log('hola')
		console.log(res.data)
		setFormState(initialForm)
	};

	

	// useEffect(() => {

	// }, [])

	return (
		<div>
			<h2>Host</h2>
			<div className={styles.container}>

				<div id="rectangle" className={styles.options}>

					<div className={styles.wrapper}>
						<form onSubmit={handleSubmit}>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Your Question Here</label>
								<input type="text" id="question" onChange={handleChange} value =  {formState.question} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type First Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Second Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Third Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="answer">Type Fourth Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<button type="submit">Submit</button>

						</form>

					</div>

				</div>
			</div>

		</div>



	)
}
