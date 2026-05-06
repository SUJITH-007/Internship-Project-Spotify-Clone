const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const PlaySession = require("../models/PlaySession");
const Track = require("../models/Track");

router.put("/update", protect, upload.single("profileImage"),
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

router.get("/dashboard", protect, async (req, res) => {
    try {
        const userId = req.user;
        const sessions = await PlaySession.find({
            user: userId,
            counted: true
        }).populate("track");
        const trackCount = {};
        const artistCount = {};
        sessions.forEach(session => {
            const track = session.track;
            if (!track || !track._id) return;
            const trackId = track._id.toString();
            trackCount[trackId] = trackCount[trackId]
                ? trackCount[trackId] + 1
                : 1;
            if (Array.isArray(track.artists)) {
                track.artists.forEach(artist => {
                    artistCount[artist] = artistCount[artist]
                        ? artistCount[artist] + 1
                        : 1;
                });
            }
        });
        const topTracks = Object.entries(trackCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([trackId, count]) => {
                const session = sessions.find(
                    s => s.track && s.track._id.toString() === trackId
                );
                if (!session || !session.track) return null;
                return { ...session.track._doc, plays: count };
            }).filter(Boolean);
        const topArtists = Object.entries(artistCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([artist, count]) => ({
                name: artist,
                plays: count
            }));
        res.json({ topTracks, topArtists });
    } catch (err) {
        res.status(500).json({ message: "Dashboard error" });
    }
});

module.exports = router;