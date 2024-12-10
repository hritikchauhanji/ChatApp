import React from "react";

import { useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";

const ChatPages = () => {
  const [messages, setMessages] = useState([
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
    {
      content: "How are you ?",
      sender: "Mayank",
    },
    {
      content: "How are you ?",
      sender: "Hritik",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentUser] = useState("Hritik");
  return (
    <div className="">
      {/* {header section} */}
      <header className="fixed flex items-center justify-around w-full py-4 shadow dark:border-gray-700 dark:bg-gray-800">
        {/* {roomId} */}
        <div>RoomId : family-group</div>
        {/* {user} */}
        <div>User : Mayank Chauhan</div>
        {/* {leave room} */}
        <div>
          <button className="px-3 py-2 font-semibold rounded-lg dark:bg-red-600 hover:dark:bg-red-700">
            Leave Room
          </button>
        </div>
      </header>
      <main className="w-2/3 h-screen px-10 py-20 mx-auto overflow-auto dark:bg-slate-600">
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
                <div className="flex flex-col gap-1">
                  <p>{message.content}</p>
                  <p>{message.sender}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* {message input section} */}
      <div className="fixed bottom-0 w-full h-16">
        <div className="flex items-center justify-between w-2/5 h-full gap-5 px-5 mx-auto rounded-full dark:bg-gray-800 dark:border-gray-700">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full px-3 py-2 rounded-lg dark:bg-gray-800 focus:outline-none"
          />
          <div className="flex items-center justify-center gap-5">
            <button className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-gray-700 hover:dark:bg-gray-600">
              <MdAttachFile size={25} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-green-700 hover:dark:bg-green-600">
              <MdSend size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPages;
