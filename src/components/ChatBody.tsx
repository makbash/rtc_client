import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSockets } from 'src/context/socket.context';

interface IChatBody {
    messages: any;
    typingStatus: any;
    lastMessageRef: any;
}

const ChatBody = () => {
    const { socket, userName, setUserName, messages } = useSockets();

    const navigate = useNavigate()

    const handleLeaveChat = () => {
        localStorage.removeItem("userName")
        navigate("/")
        window.location.reload()
    }

    return (
        <>
            <header className='chat__mainHeader'>
                <p>Welcome {userName}</p>
                <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
            </header>


            <div className='message__container'>
                {messages.length && messages.map((item) => (item.userName === localStorage.getItem("userName") ? (
                    <div className="message__chats" key={item.id}>
                        <p className='sender__name'>You</p>
                        <div className='message__sender'>
                            <p>{item.text}</p>
                        </div>
                    </div>
                ) : (
                    <div className="message__chats" key={item.id}>
                        <p>{item.userName}</p>
                        <div className='message__recipient'>
                            <p>{item.text}</p>
                        </div>
                    </div>
                )
                ))}

                <div className='message__status'>
                    {/* <p>{typingStatus}</p> */}
                </div>
                {/* <div ref={lastMessageRef} /> */}
            </div>
        </>
    )
}

export default ChatBody