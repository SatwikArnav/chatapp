import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const ChatFooter = ({ currentMessage, setCurrentMessage, sendMessage }) => {
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const onEmojiClick = (emojiObject) => {
        if (emojiObject && emojiObject.emoji) {
            setCurrentMessage((prevMessage) => prevMessage + emojiObject.emoji);
        }
    };

    return (
        <div className="flex items-center border-t-2 border-blue-400 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-4 w-full rounded-b-lg shadow-md relative text-white">
            {/* Emoji Button */}
            <div className="relative">
                <button
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    className="p-2 rounded-full hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Emoji Picker"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.31 8.66a4.5 4.5 0 00-4.62 0M8.66 14.31a4.5 4.5 0 000-4.62m9.69 0a4.5 4.5 0 010 4.62M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>

                {isEmojiPickerOpen && (
                    <div className="absolute bottom-12 left-0 z-50">
                        <EmojiPicker onEmojiClick={(emojiData) => onEmojiClick(emojiData)} />
                    </div>
                )}
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-full px-4 py-2 mx-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
            />

            {/* Send Button */}
            <button
                onClick={sendMessage}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                aria-label="Send Message"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2L15 22l-4-9-9-4 22-7z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ChatFooter;
