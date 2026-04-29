const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    name: String,
    coverImage: String,
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);