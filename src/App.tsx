import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;