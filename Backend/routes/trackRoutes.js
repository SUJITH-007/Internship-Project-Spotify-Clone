const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload, bulkUpload } = require("../middleware/uploadMiddleware");
const Track = require("../models/Track");
const User = require("../models/User");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

router.post(
    "/add", protect, upload.fields([
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

router.post(
    "/bulk",
    protect,
    bulkUpload.single("file"),
    async (req, res) => {
        console.log("=== BULK UPLOAD HIT ===");
        try {
            console.log("REQ FILE:", req.file);
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const results = [];
            const filePath = req.file.path;
            console.log("Uploaded file path:", filePath);
            let responded = false; 
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    console.log("Row:", row);
                    results.push(row);
                })
                .on("end", async () => {
                    console.log("CSV reading finished");
                    try {
                        let successCount = 0;
                        for (let song of results) {
                            const audioPath = path.join("uploads_bulk", song.audioPath);
                            const imagePath = path.join("uploads_bulk", song.imagePath);
                            console.log("Final paths:", audioPath, imagePath);
                            console.log("Checking:", audioPath, imagePath);
                            if (!fs.existsSync(audioPath) || !fs.existsSync(imagePath)) {
                                console.log("File missing for:", song.title);
                                continue;
                            }
                            const newTrack = new Track({
                                title: song.title,
                                artists: JSON.parse(song.artists),
                                genres: JSON.parse(song.genres),
                                album: song.album,
                                published: song.published === "true",
                                isPremium: song.isPremium === "true",
                                uploader: req.user,
                                thumbnail: imagePath,
                                audioFile: audioPath,
                            });
                            await newTrack.save();
                            successCount++;
                        }
                        responded = true;
                        return res.json({
                            message: "Bulk upload successful",
                            totalRows: results.length,
                            uploaded: successCount,
                        });
                    } catch (err) {
                        responded = true;
                        console.error("Processing error:", err);
                        return res.status(500).json({ message: err.message });
                    }
                })
                .on("error", (err) => {
                    responded = true;
                    console.error("CSV read error:", err);
                    return res.status(500).json({ message: "CSV read failed" });
                });
            setTimeout(() => {
                if (!responded) {
                    console.log("TIMEOUT: CSV stuck, forcing response");
                    return res.status(500).json({ message: "CSV processing timeout" });
                }
            }, 10000);
        } catch (error) {
            console.error("Bulk upload error:", error);
            return res.status(500).json({ message: error.message });
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