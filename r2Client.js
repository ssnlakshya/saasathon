const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();

let r2 = null;
if (process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY && process.env.R2_SECRET_KEY) {
    r2 = new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY,
            secretAccessKey: process.env.R2_SECRET_KEY,
        },
    });
} else {
    console.warn("⚠️ R2 Environment variables missing. Cloudflare R2 uploads disabled.");
}

module.exports = { r2 };
