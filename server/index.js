const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const { WebSocketServer } = require('ws');
const connectDb = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const broadcast = (event, payload = {}) => {
  const message = JSON.stringify({ event, payload, timestamp: new Date().toISOString() });
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(message);
  });
};

app.locals.broadcast = broadcast;

wss.on('connection', (socket) => {
  socket.send(
    JSON.stringify({
      event: 'system.connected',
      payload: { message: 'Connected to EMBERPATH realtime channel' },
      timestamp: new Date().toISOString()
    })
  );
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'EMBERPATH API', realtime: '/ws' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/knowledge', require('./routes/knowledgeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/offline', require('./routes/offlineRoutes'));
app.use('/api/map', require('./routes/mapRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server + WS running on ${PORT}`));
