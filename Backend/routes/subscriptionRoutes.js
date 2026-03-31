const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/upgrade", protect, async (req, res) => {
    try {
        const { plan } = req.body;
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        const now = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + 1);
        user.subscription = {
            plan,
            startDate: now,
            endDate: end,
        };
        await user.save();
        res.json({
            message: "Subscription updated",
            subscription: user.subscription,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;