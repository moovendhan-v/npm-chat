// index.ts

import InsertUserCommand from "@/commands/user/CreateUserCommand";
import GetUsersCommand from "@/commands/user/GetUsersCommand";
import CreateGroupCommand from "@/commands/group/CreateGroupCommand";
import InsertChannelCommand from "@/commands/channel/InsertChannleCommand";

console.log('Running index file');
console.log("testing");

// async function createUser() {
//   // Insert a new user
//   const insertUserCommand = new InsertUserCommand({username: "Moovendhan", email: "vmoovendhan3@gmail.com"});
//   const newUser = await insertUserCommand.execute();
//   console.log('Inserted User:', newUser);
// }
// createUser();


// async function gerUser() {
//   const getUsersCommand = new GetUsersCommand();
//   const users = await getUsersCommand.execute();
//   console.log('Users:', users);
// } 
// gerUser();

// async function createGroups() {
//     const createGroupsCommand = new CreateGroupCommand({ name: "Group name", adminIds: ["67452ef0510ad81dc435d777"], memberIds: ["67452ef0510ad81dc435d777"] });

//     try {
//       const group = await createGroupsCommand.execute();
//       console.log('Group created successfully:', group);
//     } catch (error) {
//       console.error('Error creating group:', error);
//     }
//   }

// createGroups();

// async function createChannle() {
//     const insertChannelCommand = new InsertChannelCommand();

//     const input = {
//         name: "Chnnelname",
//         description: "descriptions",
//         userId: "67452ef0510ad81dc435d777",
//         isAdmin: true
//       }

      
//     try {
//         const channel = await insertChannelCommand.createChannel(input);
//         console.log('Channel created:', channel);
//     } catch (error) {
//         console.error('Failed to create channel:', error);
//     }
// }
// createChannle();

// import express from 'express';
// import { createServer } from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import { WebSocketServer } from 'ws'; // Import the WebSocketServer for raw WebSocket support

// const app = express();
// const server = createServer(app);
// const io = new SocketIOServer(server);

// // Create a WebSocketServer instance for raw WebSocket (Postman testing)
// const wss = new WebSocketServer({ server });

// const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send('WebSocket server is running');
// });

// // Socket.IO connection for normal Socket.IO clients
// io.on('connection', (socket) => {
//   console.log('New Socket.IO client connected');

//   socket.on('message', (data) => {
//     console.log('Received message from Socket.IO:', data);
//     io.emit('message', `Server received via Socket.IO: ${data}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('Socket.IO client disconnected');
//   });
// });

// // Raw WebSocket connection for Postman testing
// wss.on('connection', (ws) => {
//   console.log('New raw WebSocket client connected (Postman)');

//   ws.on('message', (message) => {
//     const data = message.toString(); // Convert Buffer to String
//     console.log('Received message from raw WebSocket:', data);
//     ws.send(`Welcome ${data}`);
//   });

//   ws.on('close', () => {
//     console.log('Raw WebSocket client disconnected');
//   });
// });


// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
