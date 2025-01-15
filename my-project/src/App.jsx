import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './chat';


import io from "socket.io-client";


function App() {
  const socket = io('http://localhost:3001');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat/:username/:room" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
