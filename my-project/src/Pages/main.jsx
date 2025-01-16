import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import th from "../assets/th.jpeg";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
  const { username } = useParams();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(`https://chatapp-6-t5k7.onrender.com/rooms/${username}`)
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error("Error fetching rooms:", error));
  }, [username]);

  const filteredRooms = rooms.filter(room =>
    room.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center shadow-lg relative">
        <h1 className="text-2xl font-bold tracking-wide">💬 Chat App</h1>
        <div className="relative">
          
          <button className="text-white flex items-center space-x-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img src={th} alt="profile" className="w-10 h-10 rounded-full" />
                    <span>{username}</span>
                    
                  </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
                
              <button className="block w-full px-4 py-2 text-left hover:bg-purple-600" onClick={
                ()=>{setDropdownOpen(false);}
              }>⚙️ Settings</button>
              <button className="block w-full px-4 py-2 text-left hover:bg-purple-600" onClick={
                () => {
                  setDropdownOpen(false);
                  window.localStorage.removeItem("username");
                  navigate("/");
                }
              }>🚪 Sign Out</button>
            </div>
          )}
        </div>
      </header>
      
      {/* Search Bar & Button */}
      <div className="p-4 flex flex-col space-y-4 items-center">
        <input
          type="text"
          placeholder="🔍 Search chat rooms..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={`/join/${username}`}>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-110">
          ➕ Create/Join Room
        </button>
        </Link>
      </div>
      
      {/* Chat Rooms List */}
      <div className="flex-1 overflow-auto p-4">
        <ul className="space-y-4">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
                <Link to={`/chat/${username}/${room}`} key={index}>
              <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-purple-600 transition-colors transform hover:scale-105">
                <span className="text-lg font-semibold">{room}</span>
                <span className="text-sm text-gray-400">🟢 Active</span>
              </li>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400">No rooms found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
