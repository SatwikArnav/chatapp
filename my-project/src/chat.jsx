import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Missing import
import Topbar from './components/TopBar';
import Chatbody from './components/Chatbody';
import Chatfooter from './components/Chatfooter';
import Sidebar from './components/Sidebar';
import { useParams } from 'react-router-dom';
import Peer from "peerjs";
const Chat = ({ socket }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState(['General', 'Technology', 'Gaming', 'Music']);
  const [searchTerm, setSearchTerm] = useState('');
  const { username, room: initialRoom } = useParams();
  const [room, setRoom] = useState(initialRoom);
  const [peer, setPeer] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    
const [isVideoCallActive, setIsVideoCallActive] = useState(false);
const [localStream, setLocalStream] = useState(null);
const [videoElement, setVideoElement] = useState(null);
const [chatloader,setchatloader]=useState(true);
const [roomloader,setroomloader]=useState(true);
  
    
    useEffect(() => {
      setchatloader(true);
      setroomloader(true);
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`https://chatapp-2-cj5m.onrender.com/chat/${room}`);
          setMessageList(response.data);
          setchatloader(false);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
  
      const fetchRooms = async () => {
        try {
          const response = await axios.get(`https://chatapp-2-cj5m.onrender.com/rooms/${username}`);
          setRooms(response.data);
          setroomloader(false);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
  
      fetchRooms();
    }, [room]);

    const sendMessage = async () => {
      if (currentMessage !== '') {
        const messageData = {
          room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage('');
      }
    };
  
    useEffect(() => {
      const handleMessage = (data) => {
        setMessageList((list) => [...list, data]);
      };
  
      socket.on('receive_message', handleMessage);
  
      return () => {
        socket.off('receive_message', handleMessage);
      };
    }, [socket]);
  
    const filteredRooms = rooms.filter((room) =>
      room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  
    const startVideoCall = async () => {
      if (!isVideoCallActive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
    
          console.log("Local stream acquired");
    
          // Create and append the video element dynamically
          const video = document.createElement("video");
          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;
          video.className = "video-call";
          document.body.appendChild(video);
    
          setLocalStream(stream);
          setVideoElement(video);
          setIsVideoCallActive(true);
    
          // Emit signal for others to join
          socket.emit("video_signal", { room, peerId: peer.id });
        } catch (error) {
          console.error("Error starting video call:", error);
        }
      } else {
        stopVideoCall();
      }
    };
    
    const stopVideoCall = () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
      }
    
      if (videoElement) {
        videoElement.remove(); // Remove the video element from DOM
        setVideoElement(null);
      }
    
      if (peer) {
        peer.disconnect();
        setPeer(null);
      }
    
      setRemoteStream(null); // Remove the remote video stream
      setIsVideoCallActive(false);
      console.log("Video call stopped");
    };

  

  

    useEffect(() => {
      const newPeer = new Peer();
      setPeer(newPeer);
    
      newPeer.on("open", (id) => {
        console.log("PeerJS connected with ID:", id);
      });
    
      newPeer.on("call", (call) => {
        console.log("Incoming call...");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              console.log("Remote stream received");
              setRemoteStream(remoteStream);
            });
          })
          .catch((err) => console.error("Error accessing media devices:", err));
      });
    
      socket.on("video_signal", (data) => {
        console.log("Received video signal:", data);
        const call = newPeer.call(data.peerId);
        call.on("stream", (remoteStream) => {
          console.log("Remote stream connected");
          setRemoteStream(remoteStream);
        });
      });
    
      return () => {
        socket.off("video_signal");
      };
    }, [socket]);
  

  return (
    
    <div className="flex h-screen bg-gray-100">
      <div className="sidebar-container relative">
        <Sidebar
          rooms={filteredRooms}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setRoom={setRoom}
          socket={socket}
          roomloader={roomloader}
        />
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-md">
        <div className="fixed top-0 z-10 w-full">
          <Topbar className="bg-blue-500 text-white p-4 shadow"  startVideoCall={startVideoCall}/>
        </div>
        
        <div className="flex-1 mt-[4rem] overflow-y-auto ">
        
        <Chatbody
  className="p-4"
  messageList={messageList}
  setMessageList={setMessageList}
  room={room}  // Fixing typo from "rooom" to "room"
  chatloader={chatloader} // Fix capitalization
/>
         
        </div>
        {remoteStream && isVideoCallActive && (
        <video
          autoPlay
          playsInline
          ref={(video) => {
            if (video) {
              video.srcObject = remoteStream;
            }
          }}
          className="video-call"
        />
      )}

        <div className="sticky bottom-0 w-full">
          <Chatfooter
            className="bg-blue-500 text-white p-4 shadow"
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
