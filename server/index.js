const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDb();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'EMBERPATH API' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/knowledge', require('./routes/knowledgeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/offline', require('./routes/offlineRoutes'));
app.use('/api/map', require('./routes/mapRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
