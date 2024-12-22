import { Server as SocketIOServer, Socket } from 'socket.io';
import GetUsersService from "@/service/user/GetUsersService";

const userService: GetUsersService = new GetUsersService();

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

  io.on('connection', async (socket: Socket) => {
    const query = socket.handshake.query;

    // This is for development purposes only not a production ready code (TODO: Handle this properly)
    if (!query.userId) {
      console.error('User ID is required');
      socket.emit('error', 'User ID is required');
      socket.disconnect();
      return;
    }

    try {
      const userDetails = await userService.getUserDetails({ id: query.userId as string });
      console.log("userDetails", userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
      socket.emit('error', 'Failed to fetch user details');
      socket.disconnect();
      return;
    }

    console.log('A client connected:', socket.id);

    // Handle incoming messages
    socket.on('message', async (message: string) => {
      const userDetails = await userService.getUserDetails({ id: query.userId as string });
      console.log("userDetails", userDetails);
      console.log(`Received message: ${message}`);
      socket.emit('response', `Hi ${userDetails[0].username}, I got your message: ${message}`);
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
