const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const PlaySession = require("../models/PlaySession");
const Track = require("../models/Track");

router.post("/start", protect, async (req, res) => {
    try {
        const { trackId } = req.body;
        const session = await PlaySession.create({
            user: req.user,
            track: trackId
        });
        res.json({ sessionId: session._id });
    } catch (err) {
        res.status(500).json({ message: "Start session failed" });
    }
});

router.post("/complete", protect, async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await PlaySession.findById(sessionId);
        if (!session || session.counted) {
            return res.status(400).json({ message: "Invalid session" });
        }
        const timePlayed = (Date.now() - session.startedAt) / 1000;
        if (timePlayed < 30) {
            return res.status(400).json({ message: "Too short" });
        }
        const recent = await PlaySession.findOne({
            user: session.user,
            track: session.track,
            counted: true,
            startedAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
        });
        if (recent) {
            return res.status(400).json({ message: "Spam blocked" });
        }
        session.counted = true;
        await session.save();
        await Track.findByIdAndUpdate(session.track, {
            $inc: { playCount: 1 }
        });
        res.json({ message: "Play counted" });
    } catch (err) {
        res.status(500).json({ message: "Complete session failed" });
    }
});

module.exports = router;