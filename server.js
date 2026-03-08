const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const winston = require('winston');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const registerRoutes = require('./routes/register');

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
=======
require('dotenv').config();

const registerRoutes = require('./routes/register');
>>>>>>> 437d5de (feat: implement payment proof registration system with Cloudflare R2 storage)

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

<<<<<<< HEAD
// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api/', apiLimiter);
=======
// Routes
app.use('/api', registerRoutes);
>>>>>>> 437d5de (feat: implement payment proof registration system with Cloudflare R2 storage)

// Routes
app.use('/api', registerRoutes);

// Serve Static Frontend (Build)
app.use(express.static('frontend/dist'));

// Fallback for React Router
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('HTTP server closed');
    });
});
