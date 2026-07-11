import { io } from "socket.io-client";

export const socket = io(
  "https://ai-grocery-ai-service-2.onrender.com",
  {
    path: "/api/socket/socket.io/",
	 auth: {
    token: localStorage.getItem("token"),
  },
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"],
  }
);