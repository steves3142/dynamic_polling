import React from 'react'
import styles from '../styles/components/NewQuestionForm.module.css'

export default function NewQuestionForm({
	formState,
	handleChange,
	handleSubmit,
}) {
	return (
		<div className={styles.container}>
			<div id='rectangle' className={styles.options}>
				<div className={styles.wrapper}>
					<form onSubmit={handleSubmit}>
						<div id='rectangle' className={styles.options}>
							<label htmlFor='question'>Type Your Question Here</label>
							<input
								type='text'
								id='question'
								onChange={handleChange}
								value={formState.question}
							/>
						</div>

						<div id='rectangle' className={styles.options}>
							<label htmlFor='answer'>Type First Answer Choice</label>
							<input type='text' onChange={handleChange} />
						</div>

						<div id='rectangle' className={styles.options}>
							<label htmlFor='answer'>Type Second Answer Choice</label>
							<input type='text' onChange={handleChange} />
						</div>

						<div id='rectangle' className={styles.options}>
							<label htmlFor='answer'>Type Third Answer Choice</label>
							<input type='text' onChange={handleChange} />
						</div>

						<div id='rectangle' className={styles.options}>
							<label htmlFor='answer'>Type Fourth Answer Choice</label>
							<input type='text' onChange={handleChange} />
						</div>
						<button onClick={handleSubmit}>Submit</button>
					</form>
				</div>
			</div>
		</div>
	)
}
