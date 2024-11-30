import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { createServer } from 'http'; // Importing createServer from http

/**
 * Sets up the Socket.IO server.
 * @param app The Express app to attach the Socket.IO server to.
 * @returns An instance of the Socket.IO server.
 */
export function setupSocketServer(app: express.Application): SocketIOServer {
  // Create the HTTP server from the Express app
  const httpServer = createServer(app);

  // Initialize Socket.IO server with the HTTP server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // TODO: Update this for production with allowed origins
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('A client connected:', socket.id);

    // Handle incoming messages
    socket.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      socket.emit('response', `Hi, I got your message: ${message}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Send a welcome message
    socket.emit('welcome', 'Welcome to the Socket.IO server!');
  });

  console.log('Socket.IO server is ready');
  return io;
}