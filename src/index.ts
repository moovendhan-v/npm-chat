import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSocketServer } from './config/ws-server';

// Create an Express application
const app = express();
const PORT = 8085;

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
