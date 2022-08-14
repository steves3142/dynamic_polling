import React from 'react'
import styles from '../styles/components/HostMainDisplay.module.css'

function Announcement() {







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
			<div className={styles['bottom-div']}>
				<div className={styles['pseudo-button']}>Submit</div>
			</div>
		</div>
	)
}