const express = require("express");
const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { r2 } = require("../r2Client");
const Registration = require("../models/Registration");
require('dotenv').config();

const router = express.Router();

// Multer Setup
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG and JPG images are allowed"));
        }
    }
});

router.post("/register-with-proof", upload.single("screenshot"), async (req, res) => {
    try {
        const { teamName, transactionId } = req.body;
        const leaderData = JSON.parse(req.body.leader || "{}");
        const membersData = JSON.parse(req.body.members || "[]");
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, error: "No screenshot uploaded" });
        }

        // 1. Basic Validation (Team Size)
        const totalSize = 1 + membersData.length;
        if (totalSize < 2 || totalSize > 4) {
            return res.status(400).json({ success: false, error: "Team size must be between 2 and 4." });
        }

        // 2. Upload to Cloudflare R2 (Bypassed for now)
        // const key = `payments/${transactionId}-${Date.now()}.png`;
        // await r2.send(
        //     new PutObjectCommand({
        //         Bucket: process.env.R2_BUCKET,
        //         Key: key,
        //         Body: file.buffer,
        //         ContentType: file.mimetype
        //     })
        // );

        // const imageURL = `${process.env.R2_PUBLIC_URL}/${key}`;
        const imageURL = "https://placeholder.com/uploaded-image"; // Dummy URL for bypassing

        // 3. Save to MongoDB (Bypassed for now)
        // const registration = new Registration({
        //     teamName,
        //     leader: {
        //         name: leaderData.name,
        //         email: leaderData.email,
        //         college: leaderData.college,
        //         phone: leaderData.phone
        //     },
        //     members: membersData.map(m => ({ name: m.name, email: m.email })),
        //     transactionId,
        //     screenshot: imageURL
        // });

        // await registration.save();

        console.log(`✅ [DEV BYPASS] Saved Team to DB: ${teamName} | Leader: ${leaderData.email}`);

        res.json({
            success: true,
            message: "Team registration proof submitted!",
            screenshot: imageURL
        });

    } catch (error) {
        console.error("Registration Error:", error);

        // Handle MongoDB Duplicate Key Errors (code 11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                error: `Duplicate entry: This ${field.includes('email') ? 'email' : 'Transaction ID'} is already registered.`
            });
        }

        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin Route (MongoDB Version)
router.get("/admin/registrations", async (req, res) => {
    try {
        // const registrations = await Registration.find().sort({ createdAt: -1 });
        const registrations = []; // Bypassed for now
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
