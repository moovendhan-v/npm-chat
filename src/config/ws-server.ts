import { Server as SocketIOServer, Socket } from 'socket.io';
import GetUsersService from "@/service/user/GetUsersService";

const userService: GetUsersService = new GetUsersService();
const activeSockets: { [userId: string]: Socket } = {}; // Store active user sockets

interface SendMessagePayload {
  recipientId: string;
  message: string;
}

/**
 * Sets up the Socket.IO server.
 * @param server The Express server instance to attach Socket.IO to.
 * @returns An instance of the Socket.IO server.
 */
export function setupSocketServer(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Update this for production with allowed origins
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', async (socket: Socket) => {
    const query = socket.handshake.query;

    // Validate user ID in query params
    if (!query.userId) {
      console.error('User ID is required');
      socket.emit('error', 'User ID is required');
      socket.disconnect();
      return;
    }

    const userId = query.userId as string;

    try {
      // Authenticate the user
      const userDetails = await userService.getUserDetails({ id: userId });
      if (!userDetails || userDetails.length === 0) {
        console.error('Invalid User ID');
        socket.emit('error', 'Invalid User ID');
        socket.disconnect();
        return;
      }

      // Store the socket instance
      activeSockets[userId] = socket;
      console.log('User connected:', userId, 'Socket ID:', socket.id);

      // Handle incoming messages
      socket.on('sendMessage', async (payload: SendMessagePayload) => {
        const { recipientId, message } = payload;
        try {
          console.log(`Message received from ${userId} to ${recipientId}: ${message}`);

          // Find recipient's socket
          console.log("activeSockets", Object.keys(activeSockets));
          const recipientSocket = activeSockets[recipientId];
          if (recipientSocket) {
            recipientSocket.emit('message', { from: userId, message });
            console.log(`Message sent to ${recipientId}: ${message}`);
          } else {
            console.log(`User ${recipientId} is not online`);
            socket.emit('error', 'Recipient is not online');
          }
        } catch (error) {
          console.error('Error sending message:', error);
          socket.emit('error', 'An error occurred while sending the message');
        }
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', userId, 'Socket ID:', socket.id);
        delete activeSockets[userId];
      });

      // Send a welcome message
      socket.emit('welcome', `Welcome, user ${userId}!`);
    } catch (error) {
      console.error('Error during connection setup:', error);
      socket.emit('error', 'An error occurred during connection setup');
      socket.disconnect();
    }
  });

  console.log('Socket.IO server is ready');
  return io;
}
