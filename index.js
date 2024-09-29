// index.js


import GetUsersCommand from './commands/user/GetUsersCommand.js';
import InsertUserCommand from './commands/user/CreateUserCommand.js';
import CreateGroupCommand from './commands/group/CreateGroupCommand.js';


console.log('Running index file');

// async function createUser() {
//   // Insert a new user
//   const insertUserCommand = new InsertUserCommand('newUsersses', 'demoness@example.com');
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
//     const adminIds = ['66f8e98a9b1ee76d34240d81'];
//     const memberIds = ['66d0c154c5fc131fb72044ae'];
  
//     const createGroupsCommand = new CreateGroupCommand('My testsss', adminIds, memberIds);
  
//     try {
//       const group = await createGroupsCommand.execute();
//       console.log('Group created successfully:', group);
//     } catch (error) {
//       console.error('Error creating group:', error);
//     }
//   }
  
// createGroups();

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
