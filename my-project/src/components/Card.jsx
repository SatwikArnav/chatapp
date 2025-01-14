import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Card = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomName !== "") {
      socket.emit("join_room", roomName);
      navigate(`/chat/${username}/${roomName}`);
    } else {
      alert("Please enter both username and room name!");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Join a Room</h1>

      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 dark:text-gray-200 dark:bg-gray-700"
        aria-label="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Room name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 dark:text-gray-200 dark:bg-gray-700"
        aria-label="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <button
        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={joinRoom}
      >
        Join / Create
      </button>
    </div>
  );
};

export default Card;

