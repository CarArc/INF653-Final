require("dotenv").config();
const mongoose = require("mongoose");
const State = require("./models/States");

(async () => {
  await mongoose.connect(process.env.DATABASE_URI);
  const result = await State.deleteMany({ stateCode: { $in: ["NH", "GA", "AZ", "MT"] } });
  console.log(`Deleted: ${result.deletedCount}`);
  await mongoose.connection.close();
})();
