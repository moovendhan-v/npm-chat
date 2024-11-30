import { Server as SocketIOServer, Socket } from 'socket.io';
import { createServer } from 'http';

/**
 * Sets up the Socket.IO server.
 * @param httpServer The HTTP server to attach the Socket.IO server to.
 * @returns An instance of the Socket.IO server.
 */
export function setupSocketServer(httpServer: ReturnType<typeof createServer>): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", //TODO: Update this for production with allowed origins
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('A client connected:', socket.id);

    // Handle incoming messages
    socket.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      socket.emit('response', `Hi i got you message: ${message}`);
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
