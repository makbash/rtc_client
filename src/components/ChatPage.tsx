import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useSockets } from 'src/context/socket.context'
import EVENTS from 'src/config/events'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
    const navigate = useNavigate()
    const { socket, userName, setUserName, messages, rooms } = useSockets();

    if (!localStorage.getItem('userName')) {
        navigate('/')
        return <></>
    }

    // if (userName !== localStorage.getItem('userName')) {
    //     setUserName(String(localStorage.getItem('userName')))
    // }

    // const [typingStatus, setTypingStatus] = useState("")
    // const lastMessageRef = useRef(null);

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