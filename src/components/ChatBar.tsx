import React, { useState, useEffect, useRef } from 'react'
import EVENTS from 'src/config/events';
import { useSockets } from 'src/context/socket.context';

import styles from "src/styles/Room.module.scss";

const ChatBar = () => {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef<any>(null);

    const handleCreateRoom = () => {
        //get the room name
        const roomName: string = newRoomRef.current.value || "";
        if (!String(roomName).trim()) return;
        console.log({ roomName });
        // emit room created event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
        // set room name input to empty string
        newRoomRef.current.value = "";
    }

    function handleJoinRoom(socketId: any) {
        if (socketId === roomId) return;
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, socketId);
    }

    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     socket.on("newUserResponse", data => setUsers(data))
    // }, [socket, users])

    return (
        <div className='chat__sidebar'>
            <div>
                <h4 className='chat__header'>Rooms</h4>
                <div className='chat__users'>
                    <nav className={styles.wrapper}>
                        <div className={styles.createRoomWrapper}>
                            <input ref={newRoomRef} placeholder="Room name" />
                            <button className="cta" onClick={handleCreateRoom}>
                                CREATE ROOM
                            </button>
                        </div>

                        <ul className={styles.roomList}>
                            {rooms.length && rooms.map(room => {
                                return (
                                    <div key={room.roomId}>
                                        <button
                                            disabled={room.roomId === roomId}
                                            title={`Join`}
                                            onClick={() => handleJoinRoom(room.roomId)}
                                        >
                                            {room.roomName}
                                        </button>
                                    </div>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            <div>
                <h4 className='chat__header'>Active Users</h4>
                <div className='chat__users'>
                    {/* {users.map(user => <p key={user.socketId}>{user.userName}</p>)} */}
                </div>
            </div>
        </div>
    )
}

export default ChatBar