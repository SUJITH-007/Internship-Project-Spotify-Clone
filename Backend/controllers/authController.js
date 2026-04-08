const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
    try {
        const {
            email,
            password,
            username,
            year,
            month,
            day,
            gender,
            marketingOptOut,
            shareDataWithProviders
        } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        const role = req.body.role === "creator" ? "creator" : "user";
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            dateOfBirth: {
                year,
                month,
                day,
            },
            gender,
            role,
            marketingOptOut,
            shareDataWithProviders,
        });
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
