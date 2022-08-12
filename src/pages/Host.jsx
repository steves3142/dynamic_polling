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
							Write Questions Here
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
