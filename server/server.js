const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const cors = require("cors"); // ✅ added

const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// MongoDB connection
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // ✅ added
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoute"));

// Port setup
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgGreen.white);
});
