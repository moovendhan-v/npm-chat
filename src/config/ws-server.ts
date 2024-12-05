import { Server as SocketIOServer, Socket } from 'socket.io';

/**
 * Sets up the Socket.IO server.
 * @param server The Express server instance to attach Socket.IO to.
 * @returns An instance of the Socket.IO server.
 */
export function setupSocketServer(server: any): SocketIOServer {
  // Initialize Socket.IO server with the Express server instance
  const io = new SocketIOServer(server, {
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
