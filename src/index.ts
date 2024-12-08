import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSocketServer } from './config/ws-server';
import userRouter from '@/router/user/UsersRoute';
import groupRouter from '@/router/group/GroupRoutes';
import {Env} from "./config/Env";

console.log(Env);

// Create an Express application
const app = express();
const PORT = 8085;

// Add this middleware to handle JSON request bodies
app.use(express.json());

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express and Socket.IO!');
});
 
// Routes
app.use('/users', userRouter);
app.use('/groups', groupRouter);

// Enable CORS with configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Use Helmet to secure HTTP headers
app.use(helmet());

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express and Socket.IO!');
});

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setup the Socket.IO server with the Express server
setupSocketServer(server);
