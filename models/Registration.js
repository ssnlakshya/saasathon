const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true }
}, { _id: false });

const registrationSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    leader: {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        college: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    members: {
        type: [memberSchema],
        validate: [
            arr => arr.length <= 3,
            "Maximum of 3 additional members allowed"
        ]
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    screenshot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

registrationSchema.index({ "leader.email": 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
