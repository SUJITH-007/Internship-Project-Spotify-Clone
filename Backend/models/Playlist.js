const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    image:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tracks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }
    ]
    
},
{ timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);