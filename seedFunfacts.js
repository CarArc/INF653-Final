require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const State = require("./models/States");

const requiredFunfacts = {
  KS: [
    "Kansas has one of the world's largest hand-dug wells at Big Brutus in West Mineral.",
    "Monument Rocks in western Kansas are among the oldest exposed chalk formations in North America.",
    "The first U.S. city to install electric streetlights was Wamego, Kansas, in 1880.",
  ],
  MO: [
    "Missouri has more than 7,500 recorded caves, more than any other U.S. state.",
    "The ice cream cone gained fame at the 1904 World's Fair in St. Louis.",
    "Missouri is home to the Gateway Arch, the tallest man-made monument in the Western Hemisphere.",
  ],
  OK: [
    "Oklahoma has over 200 man-made lakes, one of the highest counts in the U.S.",
    "The state hosts one of the largest Native American populations in the country.",
    "The first parking meter in the United States was installed in Oklahoma City in 1935.",
  ],
  NE: [
    "Nebraska's Sandhills are one of the largest stabilized dune regions in the Western Hemisphere.",
    "Carhenge in Alliance, Nebraska, is a replica of Stonehenge made from vintage automobiles.",
    "Kool-Aid was invented in Hastings, Nebraska, in 1927.",
  ],
  CO: [
    "Colorado is home to the highest paved road in North America at Mount Blue Sky Scenic Byway.",
    "Denver's 5,280-foot elevation gives it the nickname Mile High City.",
    "Colorado contains 58 mountain peaks above 14,000 feet, known as fourteeners.",
  ],
};

const seed = async () => {
  if (!process.env.DATABASE_URI || process.env.DATABASE_URI.includes("username:password")) {
    throw new Error("Set a valid DATABASE_URI in .env before running the seed script.");
  }

  await connectDB();

  for (const [stateCode, funfacts] of Object.entries(requiredFunfacts)) {
    await State.findOneAndUpdate(
      { stateCode },
      { $addToSet: { funfacts: { $each: funfacts } } },
      { upsert: true, returnDocument: "after" }
    );
  }

  console.log("Seed complete for KS, MO, OK, NE, and CO.");
  await mongoose.connection.close();
};

seed().catch(async (err) => {
  console.error(err.message);
  await mongoose.connection.close();
  process.exit(1);
});
