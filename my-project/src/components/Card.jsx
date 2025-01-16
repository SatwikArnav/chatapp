import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Card = ({ socket }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [Beg, setBeg] = useState("");
  const [roomName, setRoomName] = useState("");

  const sendMessage = async () => {
    if (roomName !== '') {
      const messageData = {
        room: roomName,
        author: username ,
        message: Beg || `${username} joined the room`,
        time: new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
      };

      console.log("Sending message:", messageData);

      await socket.emit('send_message', messageData);
      
      setBeg('');
    }
  };

  const joinRoom = () => {
    if (username !== "" && roomName !== "") {
      socket.emit("join_room", { username, roomName });

      // Delay sending the message to ensure the room join is processed
      setTimeout(() => {
        sendMessage();
        navigate(`/chat/${username}/${roomName}`);
      }, 500);
      
    } else {
      alert("Please enter both username and room name!");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Join a Room</h1>

      <input
        type="text"
        placeholder="Room name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 dark:text-gray-200 dark:bg-gray-700"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Beg for it (Optional)"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 dark:text-gray-200 dark:bg-gray-700"
        value={Beg}
        onChange={(e) => setBeg(e.target.value)}
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
