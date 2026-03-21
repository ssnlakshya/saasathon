const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ MongoDB Connected Successfully"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
} else {
    console.warn("⚠️ MONGO_URI is not defined. Running without MongoDB connection.");
}

const registerRoutes = require('./routes/register');

const transports = [];

// Vercel sets the VERCEL env var automatically; disable file logs when on Vercel
if (!process.env.VERCEL) {
    transports.push(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
    transports.push(new winston.transports.File({ filename: 'logs/combined.log' }));
}

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: transports,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api', apiLimiter);

// Routes
app.use('/api', registerRoutes);

// Serve Static Frontend (Build)
app.use(express.static('frontend/dist'));

// Fallback for React Router
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html');
});

let server;
// Only start the server locally. Vercel automatically maps exported app.
if (!process.env.VERCEL) {
    server = app.listen(port, () => {
        logger.info(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    // Graceful Shutdown
    process.on('SIGTERM', () => {
        logger.info('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            logger.info('HTTP server closed');
        });
    });
}

module.exports = app;
