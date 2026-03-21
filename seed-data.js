const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/sanja/saasathon_v1/.env' });
const Registration = require('./models/Registration');

async function seedTestData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Successfully.");

        const testData = [
            {
                teamName: "TEST DATA - ByteBandits",
                leader: {
                    name: "Sanjay Test",
                    email: "sanjay_test@ssn.edu.in",
                    college: "SSN College of Engineering",
                    phone: "9876543210"
                },
                members: [
                    { name: "Rahul Test", email: "rahul_test@gmail.com" },
                    { name: "Priya Test", email: "priya_test@gmail.com" }
                ],
                transactionId: "TEST_PAY_001",
                screenshot: "https://pub-xxx.r2.dev/payments/test_proof_001.png",
                status: "pending"
            },
            {
                teamName: "TEST DATA - CodeCrushers",
                leader: {
                    name: "Arjun Test",
                    email: "arjun_test@vit.edu",
                    college: "VIT University",
                    phone: "9988776655"
                },
                members: [
                    { name: "Sneha Test", email: "sneha_test@gmail.com" }
                ],
                transactionId: "TEST_PAY_002",
                screenshot: "https://pub-xxx.r2.dev/payments/test_proof_002.png",
                status: "verified"
            }
        ];

        console.log("Cleaning old test data...");
        await Registration.deleteMany({ teamName: { $regex: "TEST DATA" } });

        console.log("Injecting new test data...");
        await Registration.insertMany(testData);

        console.log("✅ Seeded 2 test teams into the database.");
    } catch (err) {
        console.error("❌ Seeding Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seedTestData();
