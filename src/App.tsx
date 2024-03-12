import Chat from "./components/chat";
import Home from "./components/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import dotenv from 'dotenv';
function App() {
  dotenv.config();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
