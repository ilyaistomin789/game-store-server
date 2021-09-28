import { Server } from 'socket.io';
let io;
export const socketConnection = (server) => {
  io = new Server(server);
  io.on('connection', (socket) => {
    console.log(`Client connected [id=${socket.id}]`);
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

export const sendLastRatings = (lastRatings) => io.emit('lastRatings', lastRatings);
