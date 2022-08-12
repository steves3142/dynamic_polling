import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/pages/Host.module.css'


export default function Host() {

	const [formState, setFormState] = useState([])

	const handleChange = event => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};


	return (



		<div className={styles.container}>

			<div id="rectangle" className={styles.options}>

				<div className={styles.wrapper}>

					<div id="rectangle" className={styles.options}>
						Write Questions Here
					</div>

					<div id="rectangle" className={styles.options}>
						Text Field for Option1
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

				</div>

			</div>
		</div>

	)
}
