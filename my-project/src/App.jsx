import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './chat';

import Main from './Pages/main';
import AuthPage from './Pages/Auth';
import io from "socket.io-client";


function App() {
  const socket = io(`https://chatapp-6-t5k7.onrender.com`);
  return (
    <Router>
      <Routes>
        <Route path="/join/:username" element={<Home socket={socket} />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        <Route path="/" element={<AuthPage type="signin" />} />
        <Route path="/home/:username" element={<Main  />} />
        <Route path="/chat/:username/:room" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
