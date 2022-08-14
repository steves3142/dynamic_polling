import { useState, useEffect } from 'react'
import styles from '../styles/components/Announce.module.css'

export default function Announcement() {

    // const [announce, setAnnounce] = useState([])
    let [input, setInput] = useState('')


    function handleChange(e) {
    	setInput(e.target.value)
    }

    function handleSubmit(e) {
    	e.preventDefault()
    	// socket.emit('send-message', { message: input })
    	setInput('')
    }

    return (

        <div className={styles['pseudo-button']}>
            Room Announcement

            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles['form-wrapper']}>
                    <input
                        className={styles.form}
                        type='text'
                        name='chatInput'
                        onChange={handleChange}
                        value={input}
                    />
                    <button className={styles.button} type='submit'>
                        SEND
                    </button>
                </form>
            </div>


        </div>
    )
}