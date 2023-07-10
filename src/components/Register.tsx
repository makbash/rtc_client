import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSockets } from 'src/context/socket.context';
import EVENTS from 'src/config/events';
import { signUpUserFn } from 'src/api/baseApi';
import notification from 'src/helpers/notification';

const Register = () => {
    const { socket, userName, setUserName } = useSockets();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';

    const [userFullName, setUserFullName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({ userEmail, userPassword });

        try {
            await signUpUserFn({
                fullname: userFullName,
                email: userEmail,
                password: userPassword,
                role: 1,
            })
        } catch (error) {
            notification.onError(error)
        }
    }

    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign up to Chat</h2>

            <input type="text"
                name="userFullName"
                id='userFullName'
                className='userName__input'
                placeholder='full name'
                value={userFullName}
                onChange={e => setUserFullName(e.target.value)}
            />

            <input type="text"
                name="userEmail"
                id='userEmail'
                className='userName__input'
                placeholder='email'
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
            />

            <input type="password"
                minLength={6}
                name="password"
                id='password'
                className='password__input'
                placeholder='password'
                value={userPassword}
                onChange={e => setUserPassword(e.target.value)}
            />

            <button className='home__cta'>SIGN UP</button>
            <Link to="/login">SIGN IN</Link>
        </form>
    )
}

export default Register;