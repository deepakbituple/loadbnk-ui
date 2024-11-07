"use client";
import io from "socket.io-client";

const url: string = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:5001";

export const socket = io(url, { autoConnect: false, transports: ["websocket", "polling"] });
socket.connect();
