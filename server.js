const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const winston = require('winston');
require('dotenv').config();

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, Assets)
app.use(express.static(__dirname));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET'
});

// Create Order Endpoint
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            logger.warn(`Invalid amount received for order creation: ${amount}`);
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: Math.round(amount * 100), // Ensure it's an integer in paise
            currency: currency || 'INR',
            receipt: receipt || `rcpt_${crypto.randomBytes(4).toString('hex')}`
        };

        logger.info(`Creating order for amount: ${amount}, currency: ${options.currency}, receipt: ${options.receipt}`);
        const order = await razorpay.orders.create(options);

        if (!order) {
            logger.error("Razorpay order creation failed - no order object returned");
            return res.status(500).json({ error: "Error creating order" });
        }

        logger.info(`Order created successfully: ${order.id}`);
        res.json(order);
    } catch (error) {
        logger.error("Order creation error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// Verify Payment Endpoint
app.post('/api/verify-payment', (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSignature) {
            logger.info(`Payment verified successfully for order: ${razorpay_order_id}`);
            res.json({ status: "success", message: "Payment verified successfully" });
        } else {
            logger.warn(`Invalid signature attempt for order: ${razorpay_order_id}`);
            res.status(400).json({ status: "failure", message: "Invalid signature" });
        }
    } catch (error) {
        logger.error("Payment verification error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});
