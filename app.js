const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/states", require("./routes/states"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
