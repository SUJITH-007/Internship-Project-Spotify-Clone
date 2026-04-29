const mongoose = require("mongoose");

const playSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track"
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    counted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("PlaySession", playSessionSchema);