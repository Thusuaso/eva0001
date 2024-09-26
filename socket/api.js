const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { 

    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
  socket.on('cards_list_updated_emit',()=>{
    socket.broadcast.emit('cards_list_updated_on')
  });
  socket.on('order_production_list_updated_emit',()=>{
    socket.broadcast.emit('order_production_list_updated_on');
  });
});
io.close()

httpServer.listen(3001);