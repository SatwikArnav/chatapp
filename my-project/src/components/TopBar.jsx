import React from "react";
import logo from "../assets/logo.jpg";
import th from "../assets/th.jpeg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ startVideoCall }) => {
  const { room, username } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Move this inside the component

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white h-16 w-full fixed top-0 z-10 shadow-lg">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to={`/home/${username}`}>
        <img src={logo} alt="logo" className="w-12 h-12 rounded-full hover:bg-blue-600 p-1" />
        </Link>
        <h1 className="text-xl font-semibold">{room}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={startVideoCall}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
        >
          Start Video Call
        </button>
        <div className="relative">
          <button
            className="text-white flex items-center space-x-2 hover:bg-purple-600 rounded-full p-2 "
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img src={th} alt="profile" className="w-10 h-10 rounded-full" />
            <span>{username}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-purple-600"
                onClick={() => {
                  setDropdownOpen(false);
                }}
              >
                ⚙️ Settings
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-purple-600"
                onClick={() => {
                  setDropdownOpen(false);
                  window.localStorage.removeItem("username");
                  navigate("/"); // ✅ This will now work
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
