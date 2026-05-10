const State = require("../models/States");
const statesData = require("../models/statesData.json");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getStateFromData = (stateCode) =>
  statesData.find((state) => state.code === stateCode);

const mergeFunfacts = (state, stateDoc) => {
  if (!stateDoc || !Array.isArray(stateDoc.funfacts) || stateDoc.funfacts.length === 0) {
    return { ...state };
  }

  return {
    ...state,
    funfacts: [...stateDoc.funfacts],
  };
};

const getStateByCode = async (stateCode) => {
  const baseState = getStateFromData(stateCode);
  const stateDoc = await State.findOne({ stateCode }).lean();
  return mergeFunfacts(baseState, stateDoc);
};

const getStateCollection = async () => {
  const stateDocs = await State.find().lean();
  const docsByCode = new Map(stateDocs.map((doc) => [doc.stateCode, doc]));
  return statesData.map((state) => mergeFunfacts(state, docsByCode.get(state.code)));
};

const getAllStates = asyncHandler(async (req, res) => {
  const allStates = await getStateCollection();
  const { contig } = req.query;

  if (contig === "true") {
    return res.json(allStates.filter((state) => !["AK", "HI"].includes(state.code)));
  }

  if (contig === "false") {
    return res.json(allStates.filter((state) => ["AK", "HI"].includes(state.code)));
  }

  return res.json(allStates);
});

const getState = asyncHandler(async (req, res) => {
  const mergedState = await getStateByCode(req.code);
  return res.json(mergedState);
});

const getRandomFunfact = asyncHandler(async (req, res) => {
  const mergedState = await getStateByCode(req.code);

  if (!Array.isArray(mergedState.funfacts) || mergedState.funfacts.length === 0) {
    return res
      .status(404)
      .json({ message: `No Fun Facts found for ${mergedState.state}` });
  }

  const randomIndex = Math.floor(Math.random() * mergedState.funfacts.length);
  return res.json({ funfact: mergedState.funfacts[randomIndex] });
});

const getCapital = (req, res) => {
  const state = getStateFromData(req.code);
  return res.json({ state: state.state, capital: state.capital_city });
};

const getNickname = (req, res) => {
  const state = getStateFromData(req.code);
  return res.json({ state: state.state, nickname: state.nickname });
};

const getPopulation = (req, res) => {
  const state = getStateFromData(req.code);
  return res.json({
    state: state.state,
    population: state.population.toLocaleString("en-US"),
  });
};

const getAdmission = (req, res) => {
  const state = getStateFromData(req.code);
  return res.json({ state: state.state, admitted: state.admission_date });
};

const createFunfacts = asyncHandler(async (req, res) => {
  const { funfacts } = req.body;

  if (!funfacts) {
    return res.status(400).json({ message: "State fun facts value required" });
  }

  if (!Array.isArray(funfacts)) {
    return res.status(400).json({ message: "State fun facts value must be an array" });
  }

  const existingState = await State.findOne({ stateCode: req.code });

  if (existingState) {
    existingState.funfacts.push(...funfacts);
    const result = await existingState.save();
    return res.json(result);
  }

  const result = await State.create({ stateCode: req.code, funfacts });
  return res.json(result);
});

const updateFunfact = asyncHandler(async (req, res) => {
  const { index, funfact } = req.body;

  if (!index) {
    return res.status(400).json({ message: "State fun fact index value required" });
  }

  if (!funfact) {
    return res.status(400).json({ message: "State fun fact value required" });
  }

  const stateDoc = await State.findOne({ stateCode: req.code });
  const state = getStateFromData(req.code);

  if (!stateDoc || !Array.isArray(stateDoc.funfacts) || stateDoc.funfacts.length === 0) {
    return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
  }

  const indexToUpdate = Number(index) - 1;
  if (
    Number.isNaN(indexToUpdate) ||
    indexToUpdate < 0 ||
    indexToUpdate >= stateDoc.funfacts.length
  ) {
    return res
      .status(400)
      .json({ message: `No Fun Fact found at that index for ${state.state}` });
  }

  stateDoc.funfacts[indexToUpdate] = funfact;
  const result = await stateDoc.save();
  return res.json(result);
});

const deleteFunfact = asyncHandler(async (req, res) => {
  const { index } = req.body;

  if (!index) {
    return res.status(400).json({ message: "State fun fact index value required" });
  }

  const stateDoc = await State.findOne({ stateCode: req.code });
  const state = getStateFromData(req.code);

  if (!stateDoc || !Array.isArray(stateDoc.funfacts) || stateDoc.funfacts.length === 0) {
    return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });
  }

  const indexToDelete = Number(index) - 1;
  if (
    Number.isNaN(indexToDelete) ||
    indexToDelete < 0 ||
    indexToDelete >= stateDoc.funfacts.length
  ) {
    return res
      .status(400)
      .json({ message: `No Fun Fact found at that index for ${state.state}` });
  }

  stateDoc.funfacts.splice(indexToDelete, 1);
  const result = await stateDoc.save();
  return res.json(result);
});

module.exports = {
  getAllStates,
  getState,
  getRandomFunfact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  createFunfacts,
  updateFunfact,
  deleteFunfact,
};
