// index.ts


import GetUsersCommand from './commands/user/GetUsersCommand.ts';
import InsertUserCommand from './commands/user/CreateUserCommand.ts';
import {CreateGroupCommand, AddMemberToGroupCommand, AddAdminToGroupCommand, DeleteGroupCommand} from './commands/group/GroupCommand.js';
import InsertChannelCommand from './commands/channel/InsertChannleCommand.ts';

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
//     const adminIds = ['66d0c154c5fc131fb72044ae'];
//     const memberIds = ['66d0c154c5fc131fb72044ae'];
  
//     const createGroupsCommand = new CreateGroupCommand('Final group testing', adminIds, memberIds);
  
//     try {
//       const group = await createGroupsCommand.execute();
//       console.log('Group created successfully:', group);
//     } catch (error) {
//       console.error('Error creating group:', error);
//     }
//   }
  
// createGroups();

async function deleteGroup() {

  const deleteGroupCommand = new DeleteGroupCommand('66f9887244b7d4a4998bedf0');

  try {
    const group = await deleteGroupCommand.execute();
    console.log('Group deleted successfully:', group);
  } catch (error) {
    console.error('Error deleting group:', error);
  }
}

deleteGroup();

// async function createChannle() {
//   const insertChannelCommand = new InsertChannelCommand("testechannle", "teste desc", '66f8e98a9b1ee76d34240d83', true);

//   try {
//     const channel = await insertChannelCommand.execute();
//     console.log('Channel created:', channel);
//   } catch (error) {
//     console.error('Failed to create channel:', error);
//   }
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