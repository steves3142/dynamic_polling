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
		let res = await axios.post(`/host`, formState)
		console.log('hola')
		console.log(res.data)
		setFormState([])
		getBanks()
	  };

	return (
		<div>
			<h2>Host</h2>
			<div className={styles.container}>

				<div id="rectangle" className={styles.options}>

					<div className={styles.wrapper}>

							<div id="rectangle" className={styles.options}>
								<label htmlFor="question">Type Your Question Here</label>
								<input type="text" onChange={handleChange} />
							</div>

						<div id="rectangle" className={styles.options}>
							Text Field for Option 1
						</div>

						<div id="rectangle" className={styles.options}>
							Text Field for Option 2
						</div>

						<div id="rectangle" className={styles.options}>
							Text Field for Option 3
						</div>

						<div id="rectangle" className={styles.options}>
							Text Field for Option 4
						</div>

						<button onClick={handleSubmit}>Submit</button> 

					</div>

				</div>
			</div>

		</div>



	)
}
