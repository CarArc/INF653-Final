const statesData = require("../models/statesData.json");

const verifyStates = (req, res, next) => {
  const stateCode = req.params.state?.toUpperCase();
  const validCodes = statesData.map((state) => state.code);

  if (!validCodes.includes(stateCode)) {
    return res
      .status(404)
      .json({ message: "Invalid state abbreviation parameter" });
  }

  req.code = stateCode;
  next();
};

module.exports = verifyStates;
