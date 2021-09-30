import { Server } from 'socket.io';
import http from 'http';
let io;
export const socketConnection = (server: http.Server): void => {
  io = new Server(server);
  io.on('connection', (socket) => {
    console.log(`Client connected [id=${socket.id}]`);
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

export const sendLastRatings = (lastRatings: string): void => io.emit('lastRatings', lastRatings);
