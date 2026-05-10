require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const app = require("./app");

const PORT = process.env.PORT || 3500;

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
