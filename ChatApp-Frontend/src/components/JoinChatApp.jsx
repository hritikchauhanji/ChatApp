import React from "react";
import ChatIcon from "../assets/chat.png";
const JoinChatApp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full max-w-md gap-5 p-8 rounded-xl dark:bg-gray-800">
        <img src={ChatIcon} className="w-24 mx-auto" />
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room...
        </h1>
        <div className="">
          <label htmlFor="name" className="block mb-2 font-medium">
            Your name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 rounded-xl dark:bg-gray-600 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="roomId" className="block mb-2 font-medium">
            Room Id / New Room Id
          </label>
          <input
            id="roomId"
            type="text"
            className="w-full px-4 py-2 rounded-xl dark:bg-gray-600 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="px-3 py-2 font-semibold rounded-lg dark:bg-blue-600 hover:dark:bg-blue-700">
            Join Room
          </button>
          <button className="px-3 py-2 font-semibold rounded-lg dark:bg-orange-500 hover:dark:bg-orange-600">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinChatApp;
