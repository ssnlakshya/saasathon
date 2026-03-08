const express = require("express");
const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { r2 } = require("../r2Client");
require('dotenv').config();

const router = express.Router();

// Mock database (In production, use MongoDB/Postgres)
const registrations = [];
router.registrations = registrations;

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

        // 1. Validate total team size (Leader + Members)
        const totalSize = 1 + membersData.length;
        if (totalSize < 2) {
            return res.status(400).json({ success: false, error: "Minimum team size is 2." });
        }
        if (totalSize > 4) {
            return res.status(400).json({ success: false, error: "Maximum team size is 4." });
        }

        // 2. Validate Emails (Duplicate check within submission)
        const allEmails = [leaderData.email, ...membersData.map(m => m.email)];
        const uniqueEmails = new Set(allEmails);
        if (uniqueEmails.size !== allEmails.length) {
            return res.status(400).json({ success: false, error: "Duplicate emails found in team members." });
        }

        // 3. Prevent duplicate submissions (Transaction ID & Global Emails)
        const alreadyId = registrations.find(r => r.transactionId === transactionId);
        if (alreadyId) {
            return res.status(400).json({ success: false, error: "This Transaction ID has already been submitted." });
        }

        // Check if any email already registered
        const existingEmails = registrations.flatMap(r => [r.leader.email, ...r.members.map(m => m.email)]);
        const duplicateEmail = allEmails.find(email => existingEmails.includes(email));
        if (duplicateEmail) {
            return res.status(400).json({ success: false, error: `Email ${duplicateEmail} is already registered.` });
        }

        const key = `payments/${transactionId}-${Date.now()}.png`;

        // 4. Upload to Cloudflare R2
        await r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            })
        );

        const imageURL = `${process.env.R2_PUBLIC_URL}/${key}`;

        // 5. Store record in required format
        const newRecord = {
            teamName,
            leader: leaderData,
            members: membersData,
            transactionId,
            screenshot: imageURL,
            status: "pending",
            timestamp: new Date().toISOString().split('T')[0]
        };

        registrations.push(newRecord);

        console.log(`Saved Team: ${teamName} | Leader: ${leaderData.email}`);

        res.json({
            success: true,
            message: "Team registration proof submitted!",
            screenshot: imageURL
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin Route
router.get("/admin/registrations", (req, res) => {
    res.json(registrations);
});

module.exports = router;
