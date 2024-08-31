const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { 

    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {

});
io.close()

httpServer.listen(3001);