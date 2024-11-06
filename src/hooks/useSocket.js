import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url);

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;