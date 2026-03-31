const mongoose = require("mongoose")
const { ref } = require("process")

const likedSongsSchema= new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
            unique:true
        },
        tracks:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Track"
                }
            ]
}, {timestamps: true}
);

module.exports = mongoose.model("LikedSongs",likedSongsSchema);