import { io } from 'socket.io-client';
const socket = io(process.env.BACKEND_URL); // Replace with your server URL
export default socket;