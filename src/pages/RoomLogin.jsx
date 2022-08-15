import { useEffect, useState } from 'react'
import styles from '../styles/pages/RoomLogin.module.css'

export default function RoomSelect({ socket, logout }) {

    let [input, setInput] = useState('')

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        socket.emit('room-access-code', { message: input })
        setInput('')
    }

        return (
            <div className={styles['container']}>
                <div className={styles['header']}>
                    <img className={styles['logo']} src='https://i.imgur.com/4Za1ekP.png' />
                    <button onClick={logout} className={styles['logout']}>Log Out</button>
                </div>

                <div className={styles['middle-room']}>
                    <h2 className={styles['title']}>Enter Room Code</h2>
                

                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.form}
                            type='text'
                            name='roomInput'
                            onChange={handleChange}
                            value={input}
                        />
                        
                            <button
                                onClick={handleSubmit}
                                className={styles.button}
                                type='submit'>
                                Enter
                            </button>
                        
                    </form>
                </div></div>
            </div>
        )
    }