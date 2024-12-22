import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSocketServer } from './config/ws-server';
import userRouter from '@/router/user/UsersRoute';
import groupRouter from '@/router/group/GroupRoutes';
// import {Env} from "./config/Env";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import channelRouter from './router/channel/ChannelRouts';

// console.log(Env);


// Create an Express application
const app = express();
const PORT = 8085;

// Enable CORS with configuration
app.use(cors({
  origin: '*', // Replace with your frontend origin
  methods: '*', // Specify allowed methods if needed
  allowedHeaders: '*', // Allowed headers
}));

// Add this middleware to handle JSON request bodies
app.use(express.json());

// Middleware to log responses before sending them
// app.use((req, res, next) => {
//   // Create a variable to capture the original send function
//   const originalSend = res.send;

//   // Override the send function to log the response before sending
//   res.send = function (body: any) {
//     console.log('Response:', {
//       statusCode: res.statusCode,
//       body: body
//     });

//     // Call the original send function to send the response to the client
//     originalSend.call(res, body);
//   };

//   next();
// });

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express and Socket.IO!');
});

// Routes
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/channels', channelRouter);


// Use Helmet to secure HTTP headers
app.use(helmet());

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setup the Socket.IO server with the Express server
setupSocketServer(server);

app.use(errorHandlerMiddleware);