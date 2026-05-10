require("dotenv").config();

const app = require("../app");
const connectDB = require("../config/dbConn");

module.exports = async (req, res) => {
  try {
    if (req.url.startsWith("/states")) {
      await connectDB();
    }

    return app(req, res);
  } catch (err) {
    console.error("Serverless DB connection error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
