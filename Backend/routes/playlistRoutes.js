const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Playlist = require("../models/Playlist");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });
router.post("/", protect, upload.single("image"), async (req, res) => {
    try {
        const name = req.body?.name || req.body?.playlistName || "New Playlist";
        const playlist = await Playlist.create({
            name,
            user: req.user._id,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            tracks: []
        });
        res.json(playlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating playlist" });
    }
});

router.get("/", protect, async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user._id });
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: "Error fetching playlists" });
    }
});

router.post("/:id/add", protect, async (req, res) => {
    try {
        const trackId = req.body.trackId || req.body.songId;
        const playlist = await Playlist.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { tracks: trackId } },
            { new: true }
        );
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: "Error adding song" });
    }
});

module.exports = router;