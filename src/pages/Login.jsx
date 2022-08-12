import { useEffect, useState } from 'react'
import styles from '../styles/pages/Login.module.css'

import axios from 'axios'

export default function Login() {


    return (
        <div>
            <h2>Login</h2>
            <div className={styles.container}>

                <div id="rectangle" className={styles.login_box1}>
                    <div id="rectangle" className={styles.login_box2}>
                        Email
                    </div>

                    <div id="rectangle" className={styles.login_box3}>
                        Password
                    </div>

                    <div id="rectangle" className={styles.signup_box1}>
                        <button className={styles.button}>Sign In</button>
                    </div>

                    <div id="rectangle" className={styles.signup_box2}>
                    <button className={styles.button}>Sign Up</button>
                    </div>

                </div>
            </div>

        </div >
    )
}