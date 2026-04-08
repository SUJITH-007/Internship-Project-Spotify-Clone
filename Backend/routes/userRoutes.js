const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.put(
    "/update",
    protect,
    upload.single("profileImage"),
    async (req, res) => {
        try {
            const user = await User.findById(req.user);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (req.body.username) {
                user.username = req.body.username;
            }

            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            if (req.file) {
                user.profileImage = req.file.path;
            }

            await user.save();

            res.json({
                message: "Profile updated",
                user
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;