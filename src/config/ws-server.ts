import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.send('Welcome! You are connected to the WebSocket server');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8085');
