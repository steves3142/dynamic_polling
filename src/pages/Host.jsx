import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/pages/Host.css'


export default function Host() {
	
	const [formState, setFormState ] = useState([]) 

	const handleChange = event => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	  };
	

	return(

	<div className={styles.container}>
		<h2>Host Display</h2>
		<div id = "rectangle" className="first">

		
		<div id ="rectangle" className="second">
				Write Questions Here
		</div>

		</div>
		<div id = "rectangle" className="third">
				Text Field for Option1	
		</div> 
	</div>
	
	)
}
