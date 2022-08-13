import { useEffect, useState } from 'react'
import styles from '../styles/pages/Register.module.css'

import axios from 'axios'


export default function Register() {

    return (
        <div>
            <h2>Register</h2>
            <div className={styles.container}>

                <div id="rectangle" className={styles.register_box1}>
                    <div id="rectangle" className={styles.register_box2}>
                        Email
                    </div>

                    <div id="rectangle" className={styles.register_box3}>
                        Password
                    </div>

                    <div id="rectangle" className={styles.signup_box1}>
                        <button className={styles.button}>Sign In</button>
                    </div>

                    <div id="rectangle" className={styles.keep_signedin}>
                        Keep Signed In
                    </div>

                    <div id="rectangle" className={styles.signup_box2}>
                    <button>Sign Up</button>
                    </div>

                </div>
            </div>

        </div >
    )
}