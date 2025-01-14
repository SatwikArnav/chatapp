import { useState } from 'react';
import logo from '../assets/logo.jpg';
import profile from '../assets/profile.png';
const ReceiversMessage = ({ message }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex justify-end items-start my-4">
            <div className="relative">
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {message.author}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {message.time}
                            </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">{message.message}</p>
                    </div>
                    <img
                        src={profile}
                        alt="profile"
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                    />
                </div>
                <button
                    onClick={toggleDropdown}
                    className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-gray-200 dark:bg-gray-600 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                    <svg
                        className="w-4 h-4 text-gray-600 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 13a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden w-40">
                        {['Reply', 'Forward', 'Copy', 'Report', 'Delete'].map((action) => (
                            <li key={action}>
                                <button
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => alert(`${action} clicked`)}
                                >
                                    {action}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ReceiversMessage;
