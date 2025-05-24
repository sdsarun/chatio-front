// core
import { io } from "socket.io-client"

// constants

const socket = io(process.env.NEXT_PUBLIC_HOST_CHATIO_BACKEND_URL || "http://localhost:3301", {
  autoConnect: false,
});

export default socket;