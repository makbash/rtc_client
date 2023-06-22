import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import ChatPage from "./components/ChatPage";
// import socketIO from "socket.io-client"
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:5200")

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;