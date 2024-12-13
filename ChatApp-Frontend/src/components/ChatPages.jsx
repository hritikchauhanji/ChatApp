import React, { useEffect } from "react";

import { useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseUrl } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessages } from "../services/RoomServices";
import { timeAgo } from "../config/Helper";
const ChatPages = () => {
  const {
    roomId,
    currentUser,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();
  // console.log(roomId);
  // console.log(currentUser);
  // console.log(connected);
  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [roomId, currentUser, connected]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // scroll

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessages(roomId);
        // console.log(messages);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseUrl}/chat`);

      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  const sendMessages = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleKeyDown = (event) => {
    if (document.activeElement === inputRef.current?.focus()) {
      if (event.key.length === 1) {
        // Append the pressed key to the input value
        setInput((prev) => prev + event.key);
      }
    }
  };

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setConnected("");
    navigate("/");
  }

  return (
    <div className="">
      {/* {header section} */}
      <header className="fixed flex items-center justify-around w-full py-4 shadow dark:border-gray-700 dark:bg-gray-800">
        {/* {roomId} */}
        <div>
          RoomId : <span>{roomId}</span>
        </div>
        {/* {user} */}
        <div>
          User : <span>{currentUser}</span>
        </div>
        {/* {leave room} */}
        <div>
          <button
            onClick={handleLogout}
            className="px-3 py-2 font-semibold rounded-lg dark:bg-red-600 hover:dark:bg-red-700"
          >
            Leave Room
          </button>
        </div>
      </header>
      <main
        ref={chatBoxRef}
        className="h-screen px-10 py-20 mx-auto overflow-auto sm:w-2/3 dark:bg-slate-600"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-2 my-2 ${
                message.sender === currentUser ? "bg-green-900" : "bg-gray-700"
              }  rounded-lg`}
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public"
                  className="w-10 h-10"
                />
                <div className="flex flex-col gap-1 py-1">
                  <p
                    className={`text-xs ${
                      message.sender === currentUser
                        ? "text-green-500"
                        : "text-gray-300"
                    } `}
                  >
                    {message.sender}
                  </p>
                  <p>{message.content}</p>
                  <p
                    className={`text-[10px]  ${
                      message.sender === currentUser
                        ? "text-green-600"
                        : "text-gray-400"
                    } `}
                  >
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* {message input section} */}
      <div className="fixed w-full h-16 bottom-2">
        <div className="flex items-center justify-between h-full gap-5 px-5 mx-2 rounded-full sm:mx-auto md:w-2/5 sm:w-3/5 dark:bg-gray-800 dark:border-gray-700">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessages();
              }
            }}
            onFocus={() => {
              window.addEventListener("keydown", handleKeyDown); // Attach keydown listener
            }}
            onBlur={() => {
              window.removeEventListener("keydown", handleKeyDown); // Remove listener when blurred
            }}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 rounded-lg placeholder:text-xs sm:placeholder:text-sm dark:bg-gray-800 focus:outline-none"
          />
          <div className="flex items-center justify-center gap-5">
            <button className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-gray-700 hover:dark:bg-gray-600">
              <MdAttachFile size={25} />
            </button>
            <button
              onClick={sendMessages}
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-green-700 hover:dark:bg-green-600"
            >
              <MdSend size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPages;
