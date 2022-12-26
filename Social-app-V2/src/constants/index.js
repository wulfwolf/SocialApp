import { io } from "socket.io-client";
import { COLORS, SIZES, FONTS } from "./theme";
const serverUrl = "http://192.168.1.234:5000";
const socket = io(serverUrl);
const localhost = "192.168.1.234";
export { COLORS, SIZES, FONTS, localhost, socket };
