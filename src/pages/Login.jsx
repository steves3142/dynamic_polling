import { useEffect, useState } from 'react'
import styles from '../styles/pages/Login.module.css'

import axios from 'axios'

export default function Login() {


    return (
        <div>
            <h2>Login</h2>
            <div className={styles.container}>

                <div className={styles.wrapper}>

                    <div id="rectangle" className={styles.options}>

                    </div>

                </div>

            </div>
        </div>
    )
}

