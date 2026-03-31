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
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);