import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "src/config/default";
import EVENTS from "src/config/events";

export type TypeRoom = { roomId: string, roomName: string, socketId: string }
export type TypeMessage = { id: string, text: string; time: string; userName: string; socketId: string }

interface Context {
  socket: Socket;
  userName: string;
  messages: TypeMessage[];
  roomId?: string;
  rooms: TypeRoom[];
  setUserName: (value: string) => void;
  setMessages: () => void;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  setMessages: () => false,
  rooms: [],
  messages: [],
  userName: "",
});

function SocketsProvider(props: any) {
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState<TypeRoom[]>([]);
  const [messages, setMessages] = useState<TypeMessage[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value: TypeRoom[]) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    console.log(`"${userName}" joined "${value}" room`);

    setRoomId(value);
    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ id, text, userName, time, socketId }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      console.log({ messages });

      setMessages((messages) => [...messages, { id, text, userName, time, socketId }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        userName,
        setUserName,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
