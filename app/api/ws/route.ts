import { Server } from 'ws';

export default function handler(req, res) {
  if (!res.socket.server.wss) {
    console.log('Initializing WebSocket server...');
    const wss = new Server({ server: res.socket.server });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        console.log('received: %s', message);
      });

      ws.send('something');
    });

    res.socket.server.wss = wss;
  }
  res.end();
}