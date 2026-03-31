const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Track = require("../models/Track");
const User = require("../models/User"); 
const fs = require("fs");

router.post(
    "/add",protect,upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "audio", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { title, artists, genres, album, published, isPremium } = req.body;
            const newTrack = new Track({
                title,
                artists: JSON.parse(artists),
                genres: JSON.parse(genres),
                album,
                published: published === "true",
                isPremium: isPremium === "true",
                uploader: req.user,
                thumbnail: req.files.thumbnail
                    ? req.files.thumbnail[0].path
                    : "",
                audioFile: req.files.audio
                    ? req.files.audio[0].path
                    : "",
            });
            await newTrack.save();
            res.status(201).json({
                message: "Track uploaded successfully",
                track: newTrack
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get("/", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user); 
        let tracks;
        if (user.subscription && user.subscription.plan === "free") {
            tracks = await Track.find({ isPremium: false })
                .sort({ createdAt: -1 });
        } else {
            tracks = await Track.find()
                .sort({ createdAt: -1 });
        }
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.json(track);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: "Song not found" });
        }
        if (track.thumbnail && fs.existsSync(track.thumbnail)) {
            fs.unlinkSync(track.thumbnail);
        }
        if (track.audioFile && fs.existsSync(track.audioFile)) {
            fs.unlinkSync(track.audioFile);
        }
        await Track.findByIdAndDelete(req.params.id);
        res.json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", protect, upload.single("thumbnail"), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            album: req.body.album
        };
        if (req.file) {
            updateData.thumbnail = req.file.path;
        }
        const updated = await Track.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;