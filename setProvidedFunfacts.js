require("dotenv").config();

const mongoose = require("mongoose");
const State = require("./models/States");

const providedFunfacts = {
  NH: [
    "Mount Washington is New Hampshire's highest point at 6,288 feet.",
    "The New Hampshire state fruit is the pumpkin.",
    "The New Hampshire state gem is smoky quartz."
  ],
  RI: [
    "Rhode Island's state marine mammal is the harbor seal.",
    "The Rhode Island state soil is Narragansett.",
    "Rhode Island's state song is 'Rhode Island's It for Me.'"
  ],
  GA: [
    "Georgia's state marine mammal is the North Atlantic right whale.",
    "The Georgia state flower is the Cherokee rose.",
    "Georgia's state tree is the southern live oak."
  ]
};

const run = async () => {
  await mongoose.connect(process.env.DATABASE_URI);

  for (const [stateCode, funfacts] of Object.entries(providedFunfacts)) {
    await State.findOneAndUpdate(
      { stateCode },
      { $set: { funfacts } },
      { upsert: true, returnDocument: "after" }
    );
  }

  const results = await State.find(
    { stateCode: { $in: Object.keys(providedFunfacts) } },
    { _id: 0, stateCode: 1, funfacts: 1 }
  )
    .sort({ stateCode: 1 })
    .lean();

  console.log(JSON.stringify(results));
  await mongoose.connection.close();
};

run().catch(async (err) => {
  console.error(err.message);
  await mongoose.connection.close();
  process.exit(1);
});
