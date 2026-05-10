require("dotenv").config();

const mongoose = require("mongoose");
const State = require("./models/States");
const statesData = require("./models/statesData.json");

const targetCodes = ["NH", "RI", "GA"];

const run = async () => {
  await mongoose.connect(process.env.DATABASE_URI);

  for (const code of targetCodes) {
    const stateFromJson = statesData.find((s) => s.code === code);
    const hasFunfactsInJson = Array.isArray(stateFromJson?.funfacts);

    if (hasFunfactsInJson) {
      await State.findOneAndUpdate(
        { stateCode: code },
        { $set: { funfacts: stateFromJson.funfacts } },
        { upsert: true }
      );
      console.log(`Updated ${code} with ${stateFromJson.funfacts.length} funfacts from JSON.`);
    } else {
      await State.deleteOne({ stateCode: code });
      console.log(`Deleted ${code} from MongoDB (no funfacts in JSON).`);
    }
  }

  const current = await State.find(
    { stateCode: { $in: targetCodes } },
    { _id: 0, stateCode: 1, funfacts: 1 }
  ).lean();

  console.log("Current MongoDB docs for target states:", JSON.stringify(current));
  await mongoose.connection.close();
};

run().catch(async (err) => {
  console.error(err.message);
  await mongoose.connection.close();
  process.exit(1);
});
