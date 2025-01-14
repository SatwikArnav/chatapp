import React from 'react';
import Topbar from './components/TopBar';
import Chatbody from './components/Chatbody';
import Chatfooter from './components/Chatfooter';
//import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const Chat = ({socket}) => {
  const [currentMessage, setCurrentMessage] = useState("$");
  const [messageList, setMessageList] = useState([]);
  const { username, room} = useParams();
  
  const sendMessage = async () => {

    console.log("sending: ", currentMessage);

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
  
    socket.on("receive_message", handleMessage);
  
    // Cleanup to prevent multiple listeners
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [socket]);
  
  console.log("messageList: ",messageList);
  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <div className="fixed top-0 z-10 w-full">
        <Topbar className="bg-blue-500 text-white p-4" />
      </div>

      {/* Chat Body */}
    
      <div className="flex-1 mt-[4rem] overflow-y-auto">
        {/* mt-[4rem] ensures the Chatbody starts below the Topbar */}
        <Chatbody className="bg-blue-500 text-white p-4" messageList={messageList} />
      </div>
    

      {/* Chat Footer */}
      <div className="sticky bottom-0 w-full">
        <Chatfooter className="bg-blue-500 text-white p-4" currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
