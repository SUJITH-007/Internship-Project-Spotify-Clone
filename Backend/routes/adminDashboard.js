const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Track = require("../models/Track");

router.get("/", async (req, res) => {
    try {
        const freeSongs = await Track.countDocuments({ isPremium: false });
        const premiumSongs = await Track.countDocuments({ isPremium: true });
        const totalUsers = await User.countDocuments();
        const freeUsers = await User.countDocuments({
            "subscription.plan": "free"
        });
        const premiumUsers = await User.countDocuments({
            "subscription.plan": { $ne: "free" }
        });
        const topSongsRaw = await Track.find()
            .sort({ playCount: -1 })
            .limit(5)
            .select("title playCount");
        const topSongs = topSongsRaw.map(song => ({
            title: song.title,
            playCount: song.playCount || 0
        }));
        const topArtistsRaw = await Track.aggregate([
            {
                $match: { playCount: { $gt: 0 } }
            },
            {
                $unwind: "$artists"
            },
            {
                $group: {
                    _id: "$artists",
                    totalPlays: { $sum: "$playCount" },
                    trackCount: { $sum: 1 }
                }
            },
            {
                $sort: { totalPlays: -1 }
            },
            {
                $limit: 5
            }
        ]);
        const topArtists = topArtistsRaw.map(a => ({
            name: a._id,
            totalPlays: a.totalPlays || 0
        }));
        const statusChart = [
            { name: "Free Users", value: freeUsers },
            { name: "Premium Users", value: premiumUsers }
        ];
        res.json({
            statusChart,
            totalUsers,
            topSongs,
            topArtists,
            freeSongs,
            premiumSongs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Dashboard error" });
    }
});

module.exports = router;