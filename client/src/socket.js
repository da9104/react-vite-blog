import { io } from "socket.io-client";

// export const socket = io("http://localhost:8800");

// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.NODE_ENV === 'production' ? undefined : import.meta.env.VITE_API_BASE_URL;
const URL = import.meta.env.VITE_API_BASE_URL

export const socket = io(URL, {
    transports: ['websocket'], // Required when using Vite     
    autoConnect: false,
    withCredentials: true, 
});