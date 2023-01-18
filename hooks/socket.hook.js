import { useEffect, useState } from "react";
import io from "socket.io-client";
import { BASE_API_URL, SOCKET_TOKEN } from "../utils/constants";

export const useSocketIO = (setMessages) => {
  const socket = io(BASE_API_URL, {
    transports: ["websocket", "polling", "flashsocket"],
    auth: { token: SOCKET_TOKEN },
  });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    console.log("connecting...");
    socket.once("connect", () => {
      console.log("Socket Connected");
      setIsConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection failed: " + err.message);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });
    socket.on("new_sensor_data", (data) => {
      setMessages((messageArr) => {
        const x = messageArr.find((item) => item.short_id === data.short_id);
        if (!x) {
          return [data, ...messageArr];
        } else {
          return messageArr;
        }
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("new_sensor_data");
    };
  }, []); // eslint-disable-line
  return { isConnected, socket };
};
