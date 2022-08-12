import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Host.module.css'
import axios from 'axios'

export default function Host() {

	const [formState, setFormState] = useState([])

	const handleChange = event => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let res = await axios.post(``, formState)
		console.log('hola')
		console.log(res.data)
		setFormState([])

	};

	return (
		<div>
			<h2>Host</h2>
			<div className={styles.container}>

				<div id="rectangle" className={styles.options}>

					<div className={styles.wrapper}>
						<form>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Your Question Here</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type First Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Second Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Third Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Fourth Answer Choice</label>
								<input type="text" onChange={handleChange} />
							</div>

							<button type="submit" onClick={handleSubmit}>Submit</button>

						</form>

					</div>

				</div>
			</div>

		</div>



	)
}
