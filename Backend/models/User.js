const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            year: Number,
            month: String,
            day: Number,
        },
        gender: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "creator"],
            default: "user",
        },
        marketingOptOut: {
            type: Boolean,
            default: false,
        },
        shareDataWithProviders: {
            type: Boolean,
            default: false,
        },
        subscription: {
            plan: {
                type: String,
                enum: ["free", "lite", "standard", "platinum", "student"],
                default: "free",
            },
            startDate: Date,
            endDate: Date,
        },
        profileImage: {
            type: String,
            default: "uploads/images/default.png",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);