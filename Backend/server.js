const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
const trackRoutes = require("./routes/trackRoutes");

app.use("/api/tracks", trackRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/likes",likeRoutes)
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});   
const protect = require("./middleware/authMiddleware");
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "Protected route accessed", userId: req.user });
});
