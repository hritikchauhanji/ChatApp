import React, { useState } from "react";
import ChatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinRoomApi } from "../services/RoomServices";
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";
import { httpClient } from "../config/AxiosHelper";
const JoinChatApp = () => {
  const [details, setDetails] = useState({
    roomId: "",
    userName: "",
  });

  const { roomId, currentUser, setRoomId, setCurrentUser, setConnected } =
    useChatContext();

  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (details.roomId === "" || details.userName === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      //join room
      try {
        const room = await joinRoomApi(details.roomId);
        toast.success("Room joined...");
        setCurrentUser(details.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining...");
          console.log(error);
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // create room
      console.log(details);
      // call api to create room on backend
      try {
        const response = await createRoomApi(details.roomId);
        console.log(response);
        toast.success("Room Created Successfully !!");
        setCurrentUser(details.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.log(error);
        if (error.status == 400) {
          toast.error("Room is already exists !!");
        } else {
          console.log("Error in creating room");
        }
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full max-w-md gap-5 p-8 mx-2 sm:mx-0 rounded-xl dark:bg-gray-800">
        <img src={ChatIcon} className="w-24 mx-auto" />
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room...
        </h1>
        <div className="">
          <label htmlFor="name" className="block mb-2 font-medium">
            Your name
          </label>
          <input
            name="userName"
            placeholder="Enter the name"
            onChange={handleFormInputChange}
            value={details.userName}
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
            name="roomId"
            placeholder="Enter the roomId"
            onChange={handleFormInputChange}
            value={details.roomId}
            id="roomId"
            type="text"
            className="w-full px-4 py-2 rounded-xl dark:bg-gray-600 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={joinChat}
            className="px-3 py-2 font-semibold rounded-lg dark:bg-blue-600 hover:dark:bg-blue-700"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 font-semibold rounded-lg dark:bg-orange-500 hover:dark:bg-orange-600"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinChatApp;
