import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import EVENTS from 'src/config/events';
import { useSockets } from 'src/context/socket.context';

const Home = () => {
    const { socket, userName, setUserName } = useSockets();

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        navigate("/chat")
    }

    console.log({ userName });

    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Chat</h2>
            {/* <label htmlFor="userName">Username</label> */}
            <input type="text"
                minLength={6}
                name="userName"
                id='userName'
                className='userName__input'
                placeholder='user name'
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />

            <button className='home__cta'>SIGN IN</button>
        </form>
    )
}

export default Home