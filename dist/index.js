"use strict";
// index.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateGroupCommand_js_1 = require("./commands/group/CreateGroupCommand.js");
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
function deleteGroup() {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteGroupCommand = new CreateGroupCommand_js_1.DeleteGroupCommand('66f9887244b7d4a4998bedf0');
        try {
            const group = yield deleteGroupCommand.execute();
            console.log('Group deleted successfully:', group);
        }
        catch (error) {
            console.error('Error deleting group:', error);
        }
    });
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
