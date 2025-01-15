import React from 'react';
import SendersMessage from './SendersMessage';
import ReceiversMessage from './ReceiversMessage';
import { useParams } from 'react-router-dom';

const Chatbody = ({ messageList, setMessageList, room }) => {
    const { username } = useParams();
  
    return (
      <div className="flex flex-col p-4 h-screen w-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
        {messageList.map((message, index) => (
          <div key={index} className="my-2">
            {message.author === username ? (
              <ReceiversMessage message={message} />
            ) : (
              <SendersMessage message={message} />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default Chatbody;