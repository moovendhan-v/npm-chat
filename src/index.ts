import express from 'express';
import cors from 'cors'; // Import the CORS middleware
import helmet from 'helmet'; // Import Helmet for security headers
import { setupSocketServer } from './config/ws-server'; // Import the setupSocketServer function

// Create an Express application
const app = express();
const PORT = 8085;

// Enable CORS with configuration
app.use(cors({
  origin: "*",  // You can specify the allowed origin here for production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Use Helmet to secure HTTP headers
app.use(helmet());

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express and Socket.IO!');
});

// Setup the Socket.IO server
setupSocketServer(app);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
