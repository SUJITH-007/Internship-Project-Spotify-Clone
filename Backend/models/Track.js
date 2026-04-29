const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        artists: [String],
        genres: [String],
        album: String,
        albumId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            default: null
        },
        thumbnail: String,
        audioFile: String,
        isPremium: {
            type: Boolean,
            default: false,
        },
        published: {
            type: Boolean,
            default: false,
        },
        playCount: {
            type: Number,
            default: 0
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);