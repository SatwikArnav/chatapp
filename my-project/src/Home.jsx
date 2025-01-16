import React from 'react';
import Card from './components/Card';
import { Link, useParams } from 'react-router-dom';

const Home = ({ socket }) => {
  const { username } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <Link
        to={`/home/${username}`}
        className="relative text-4xl font-bold mb-8 transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500 dark:hover:text-blue-400"
      >
        CHAT ASS
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
      </Link>
      <Card socket={socket} />
    </div>
  );
};

export default Home;

