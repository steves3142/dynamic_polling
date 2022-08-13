import { useEffect, useState } from 'react'
import styles from '../styles/pages/Login.module.css'

import axios from 'axios'

export default function Login() {

    const [formState, setFormState] = useState([])

    const initialForm = {
        email: '',
        passwordDigest: '',
        type: 'MC',
    }


	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}

    const handleSubmit = async (event) => {
        event.preventDefault()
        let res = await axios.post(`http://localhost:3001/api/host`, formState)
        console.log('hola')
        console.log(res.data)
        setFormState(initialForm)
    }

    return (
        <div>
            <h2>Login</h2>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div id="rectangle" className={styles.login_box1}>
                        <div id="rectangle" className={styles.login_box2}>
                            Email
                            <label htmlFor="question">Type Your Question Here</label>
								<input type="text" id="question" onChange={handleChange} value={formState.email} />
                        </div>

                        <div id="rectangle" className={styles.login_box3}>
                            Password
                        </div>

                        <div id="rectangle" className={styles.signup_box1}>
                            <button onClick={handleSubmit} className={styles.button}>Sign In</button>
                        </div>

                        <div id="rectangle" className={styles.signup_box2}>
                            <button className={styles.button}>Sign Up</button>
                        </div>

                    </div>
                    
                </form>

            </div>

        </div >
    )
}