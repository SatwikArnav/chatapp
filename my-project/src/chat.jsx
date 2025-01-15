import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Missing import
import Topbar from './components/TopBar';
import Chatbody from './components/Chatbody';
import Chatfooter from './components/Chatfooter';
import Sidebar from './components/Sidebar';
import { useParams } from 'react-router-dom';

const Chat = ({ socket }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState(['General', 'Technology', 'Gaming', 'Music']);
  const [searchTerm, setSearchTerm] = useState('');
  const { username, room: initialRoom } = useParams();
  const [room, setRoom] = useState(initialRoom);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chat/${room}`);
        setMessageList(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/${username}`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on('receive_message', handleMessage);

    return () => {
      socket.off('receive_message', handleMessage);
    };
  }, [socket]);

  const filteredRooms = rooms.filter((room) =>
    room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sidebar-container relative">
        <Sidebar
          rooms={filteredRooms}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setRoom={setRoom}
          socket={socket}
        />
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-md">
        <div className="fixed top-0 z-10 w-full">
          <Topbar className="bg-blue-500 text-white p-4 shadow" />
        </div>

        <div className="flex-1 mt-[4rem] overflow-y-auto">
          <Chatbody
            className="p-4"
            messageList={messageList}
            setMessageList={setMessageList}
            room={room}
          />
        </div>

        <div className="sticky bottom-0 w-full">
          <Chatfooter
            className="bg-blue-500 text-white p-4 shadow"
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
