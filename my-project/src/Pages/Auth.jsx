import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ type }) => {
  const isSignup = type === "signup";
  const navigate = useNavigate();

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // API Call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const apiUrl = isSignup ? `https://chatapp-2-cj5m.onrender.com/signup` : `https://chatapp-2-cj5m.onrender.com/signin`;

    // Prepare request payload
    const payload = { username, password };
    if (isSignup) payload.email = email;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to main page with username
        navigate(`/home/${username}`);
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-white">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-400 mt-1">
          {isSignup ? "Join us today!" : "Sign in to continue"}
        </p>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Username (Required for both Sign Up and Sign In) */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Email (Only for Sign Up) */}
          {isSignup && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-white bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                required
              />
            </div>
          )}

          {/* Password (Required for both Sign Up and Sign In) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition transform hover:scale-105"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle between Sign Up and Sign In */}
        <p className="mt-4 text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => navigate(isSignup ? "/" : "/signup")}
            className="ml-1 text-purple-400 hover:text-purple-300 transition hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

