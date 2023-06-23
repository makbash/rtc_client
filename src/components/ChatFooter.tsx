import React, { useState } from 'react'
import EVENTS from 'src/config/events';
import { useSockets } from 'src/context/socket.context';

const ChatFooter = () => {
    const { socket, userName, roomId, messages, setMessages } = useSockets();

    const [message, setMessage] = useState("")
    const handleTyping = () => socket.emit("typing", `${userName} is typing`)

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!String(message).trim()) {
            console.error(`message is not empty`);
            return;
        }

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
            id: `${socket.id}${Math.random()}`,
            text: message,
            userName,
            roomId,
            socketId: socket.id,
        });

        // const date = new Date();
        // setMessages([...messages, {
        //     userName: "You",
        //     message,
        //     time: `${date.getHours()}:${date.getMinutes()}`,
        // }]);

        setMessage("")
    }
    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    )
}

export default ChatFooter