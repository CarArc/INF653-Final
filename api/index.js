require("dotenv").config();

const app = require("../app");
const connectDB = require("../config/dbConn");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Serverless DB connection error:", err);
    return res.status(500).json({ error: `DB connection failed: ${err.message}` });
  }

  return app(req, res);
};
