import React from 'react';
import Card from './components/card';

const Home = ({ socket }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8">CHAT ASS</h1>
      <Card socket={socket} />
    </div>
  );
};

export default Home;