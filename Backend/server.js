const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const admindashboard = require("./routes/adminDashboard");
const trackRoutes = require("./routes/trackRoutes");
const playRoutes = require("./routes/playRoutes");
const albumRoutes = require("./routes/albumRoutes");
const app = express();

// app.use(cors({
//   origin: "http://localhost:3000", 
//   credentials: true
// }));
app.use(cors({
  origin: [
    // "http://localhost:3000",
    "https://internship-project-spotify-clone-gv35pgdlm.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/play", playRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/likes",likeRoutes)
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads_bulk", express.static("uploads_bulk"));
app.use("/api/playlists", playlistRoutes);
app.use("/api/dashboard",admindashboard);
app.use("/api/albums", albumRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});   
const protect = require("./middleware/authMiddleware");
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "Protected route accessed", userId: req.user });
});
