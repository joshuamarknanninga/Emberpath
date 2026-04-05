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

wss.on('error', (error) => {
  console.warn(`[ws] ${error.code || 'error'}: ${error.message}`);
});

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', service: 'EMBERPATH API', realtime: '/ws', allowedOrigins: [...allowedOrigins].filter(Boolean) })
);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/knowledge', require('./routes/knowledgeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/offline', require('./routes/offlineRoutes'));
app.use('/api/map', require('./routes/mapRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));

app.use(notFound);
app.use(errorHandler);

const DEFAULT_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_ATTEMPTS = 10;
let attempts = 0;
let currentPort = DEFAULT_PORT;

const listen = () => {
  server.listen(currentPort, () => {
    const isFallback = currentPort !== DEFAULT_PORT;
    console.log(`Server + WS running on ${currentPort}${isFallback ? ` (fallback from ${DEFAULT_PORT})` : ''}`);
  });
};

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && attempts < MAX_PORT_ATTEMPTS) {
    attempts += 1;
    currentPort += 1;
    console.warn(`Port in use. Retrying on ${currentPort} (${attempts}/${MAX_PORT_ATTEMPTS})...`);
    setTimeout(listen, 200);
    return;
  }

  console.error('Server failed to start:', error.message);
  process.exit(1);
});

listen();
