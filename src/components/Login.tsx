import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSockets } from 'src/context/socket.context';
import EVENTS from 'src/config/events';
import { signInUserFn } from 'src/api/baseApi';
import notification from 'src/helpers/notification';
import { setItem } from 'src/helpers/utils';
import { useAuthState } from 'src/context/auth.context';

const Login = () => {
    const userProvider = useAuthState();
    const { authState, dispatch } = userProvider;

    const { socket, userName, setUserName } = useSockets();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';

    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({ userEmail, userPassword });

        try {
            const response = await signInUserFn({ email: userEmail, password: userPassword })
            console.log({ response })

            if (!response.success) {
                throw new Error('Unknown error!')
            }

            setItem('accessToken', response.data.accessToken)
            userProvider.dispatch({ type: 'SET_USER', payload: response.data });
            notification.onSuccess('You successfully logged in')

            navigate("/chat")
        } catch (error) {
            notification.onError(error)
        }
    }

    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Chat</h2>
            {/* <label htmlFor="userEmail">UserEmail</label> */}
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

            <button className='home__cta'>SIGN IN</button>
            <Link to="/register">SIGN UP</Link>
        </form>
    )
}

export default Login;