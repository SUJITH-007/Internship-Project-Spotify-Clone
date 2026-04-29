const express = require("express");
const router = express.Router();
const Album = require("../models/Album");
const Track = require("../models/Track");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/create", upload.single("thumbnail"), async (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).json({ message: "Name required" });
    const album = new Album({
        name,
        coverImage: req.file ? req.file.filename : ""
    });
    await album.save();
    res.json(album);
});

router.get("/", async (req, res) => {
    const albums = await Album.find().populate("tracks");
    res.json(albums);
});

router.post("/add-track", async (req, res) => {
    const { albumId, trackId } = req.body;
    const track = await Track.findById(trackId);
    if (track.albumId) {
        await Album.findByIdAndUpdate(track.albumId, {
            $pull: { tracks: trackId }
        });
    }
    await Album.findByIdAndUpdate(albumId, {
        $addToSet: { tracks: trackId }
    });
    await Track.findByIdAndUpdate(trackId, {
        albumId: albumId
    });
    res.json({ message: "Track moved to album" });
});

router.post("/remove-track", async (req, res) => {
    const { trackId } = req.body;
    const track = await Track.findById(trackId);
    if (!track.albumId) return res.json({ message: "No album" });
    await Album.findByIdAndUpdate(track.albumId, {
        $pull: { tracks: trackId }
    });
    await Track.findByIdAndUpdate(trackId, {
        albumId: null
    });
    res.json({ message: "Removed from album" });
});

router.delete("/:id", async (req, res) => {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

router.put("/:id", upload.single("thumbnail"), async (req, res) => {
    try {
        const updateData = {
            name: req.body.name
        };
        if (req.file) {
            updateData.coverImage = req.file.filename;
        }
        const album = await Album.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(album);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Update failed" });
    }
});

router.get("/search/:query", async (req, res) => {
    try {
        const q = req.params.query;
        const albums = await Album.find({
            name: { $regex: q, $options: "i" }
        }).limit(10);
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
});

module.exports = router;