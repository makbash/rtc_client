import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useSockets } from 'src/context/socket.context'
import EVENTS from 'src/config/events'
import { useNavigate } from 'react-router-dom'
import { getItem, setItem } from 'src/helpers/utils'
import { useAuthState } from 'src/context/auth.context'

const ChatPage = () => {
    const navigate = useNavigate()
    const { socket, userName, setUserName, messages, rooms } = useSockets();

    const userProvider = useAuthState();
    const { authState } = userProvider;

    useEffect(() => {
        ; (() => {
            if (authState.isAuthenticated) {
                setItem('userName', String(authState.user?.fullname || authState.user?.email))
                setUserName(String(authState.user?.fullname || authState.user?.email))
            }
        })()
    }, [authState.isAuthenticated]);

    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);

    // rooms.find(item => item.roomName !== 'testroom')

    // useEffect(() => {
    //     socket.on("messageResponse", data => setMessages([...messages, data]))
    // }, [socket, messages])

    // useEffect(() => {
    //     socket.on("typingResponse", data => setTypingStatus(data))
    // }, [socket])

    // useEffect(() => {
    //     // 👇️ scroll to bottom every time messages change
    //     lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);


    if (!authState.isReady) {
        return <></>
    }

    if (!authState.isAuthenticated) {
        navigate('/login')
        return <>Redirect...</>
    }

    return (
        <div className="chat">
            <ChatBar />
            <div className='chat__main'>
                <ChatBody />
                <ChatFooter />
            </div>
        </div>
    )
}

export default ChatPage