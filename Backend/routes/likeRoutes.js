const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const LikedSongs = require("../models/LikedSongs");

router.post("/", protect, async (req, res) => {
    try {
        const { trackId } = req.body;
        if (!trackId) {
            return res.status(400).json({ message: "trackId required" });
        }
        let userLikes = await LikedSongs.findOne({ user: req.user });
        if (!userLikes) {
            userLikes = await LikedSongs.create({
                user: req.user,
                tracks: [trackId]
            });
        } else {
            const exists = userLikes.tracks.some(
                id => id && id.toString() === trackId
            );
            if (exists) {
                userLikes = await LikedSongs.findOneAndUpdate(
                    { user: req.user },
                    { $pull: { tracks: trackId } },
                    { new: true }
                );
            } else {
                userLikes = await LikedSongs.findOneAndUpdate(
                    { user: req.user },
                    { $addToSet: { tracks: trackId } }, 
                    { new: true }
                );
            }
        }
        const populated = await userLikes.populate("tracks");
        res.json(populated.tracks);
    } catch (err) {
        console.error("LIKE ERROR:", err);
        res.status(500).json({ message: "Error updating likes" });
    }
});

router.get("/", protect, async (req, res) => {
    try {
        const userLikes = await LikedSongs
            .findOne({ user: req.user })
            .populate("tracks");
        if (!userLikes) {
            return res.json([]);
        }
        res.json(userLikes.tracks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching likes" });
    }
});

module.exports = router;