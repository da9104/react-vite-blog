import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_ASSETS_URL : import.meta.env.VITE_API_BASE_URL;
// const URL = import.meta.env.VITE_API_BASE_URL

export const socket = io(URL, {
    transports: ['websocket'], // Required when using Vite     
    autoConnect: false,
    withCredentials: true, 
});