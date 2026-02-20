const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

require("./config/db")();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/farmer", require("./routes/farmerRoutes"));
app.use("/api/official", require("./routes/officialRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));