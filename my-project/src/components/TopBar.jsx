import React from "react";
import logo from "../assets/logo.jpg";
import th from "../assets/th.jpeg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ startVideoCall }) => {
  const { room, username } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white h-20 md:h-16 w-full fixed top-0 z-10 shadow-md">
      
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to={`/home/${username}`}>
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full hover:bg-blue-600 p-1" />
        </Link>
        <h1 className="text-sm md:text-lg font-semibold truncate ">{room}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={startVideoCall}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 md:py-2 md:px-4 rounded-md shadow-md text-xs md:text-sm whitespace-nowrap"
        >
          🎥 Video
        </button>

        <div className="relative">
          <button
            className="text-white flex items-center space-x-1 md:space-x-2 hover:bg-purple-600 rounded-full p-1 md:p-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img src={th} alt="profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
            <span className="hidden md:inline">{username}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-10 md:top-12 w-36 bg-gray-800 text-white rounded-md shadow-md overflow-hidden">
              <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-purple-600"
                onClick={() => setDropdownOpen(false)}
              >
                ⚙️ Settings
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-purple-600"
                onClick={() => {
                  setDropdownOpen(false);
                  window.localStorage.removeItem("username");
                  navigate("/");
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
