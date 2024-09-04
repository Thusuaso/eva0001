import { io } from "socket.io-client";

class SocketConnection{
    constructor(){
        this.socket = null;
        this.connection()
    }
    connection(){
        this.socket = io('http://localhost:3001');
    }
};
export default SocketConnection;