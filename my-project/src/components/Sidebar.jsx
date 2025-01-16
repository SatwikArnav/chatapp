import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdChatBubbleOutline } from 'react-icons/md';
import { useParams, useNavigate, Link } from 'react-router-dom';



const Sidebar = ({ rooms, searchTerm, setSearchTerm, socket , setRoom}) => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-full bg-blue-600 text-white shadow-lg flex flex-col p-4 w-[16rem] overflow-hidden">
      {/* Header */}
      <div className="text-xl font-semibold mb-4 text-center">
        Chat Rooms
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-full p-2 pl-10 rounded-lg bg-blue-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Room List */}
      <ul className="space-y-3 flex-1 overflow-y-auto">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <li
              key={room}
              onClick={() => {
                socket.emit("join_room", {roomName: room, username: username});
                
                navigate(`/chat/${username}/${room}`);
                setRoom(room);
                
              }}
              className="flex items-center p-3 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-200"
            >
              <MdChatBubbleOutline className="text-xl mr-3" />
              <span className="text-sm">{room}</span>
            </li>
          ))
        ) : (
          <div className="text-center text-gray-300">No rooms found</div>
        )}
      </ul>
      <div className='flex items-center justify-center'>
      <Link to={`/join/${username}`} >
      
        Create/Join Room
        </Link>
        </div>
    </div>
  );
};

export default Sidebar;
