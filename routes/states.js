const express = require("express");
const verifyStates = require("../middleware/verifyStates");
const statesController = require("../controllers/statesController");

const router = express.Router();

router.route("/").get(statesController.getAllStates);

router
  .route("/:state")
  .all(verifyStates)
  .get(statesController.getState);

router
  .route("/:state/funfact")
  .all(verifyStates)
  .get(statesController.getRandomFunfact)
  .post(statesController.createFunfacts)
  .patch(statesController.updateFunfact)
  .delete(statesController.deleteFunfact);

router.route("/:state/capital").all(verifyStates).get(statesController.getCapital);
router.route("/:state/nickname").all(verifyStates).get(statesController.getNickname);
router.route("/:state/population").all(verifyStates).get(statesController.getPopulation);
router.route("/:state/admission").all(verifyStates).get(statesController.getAdmission);

module.exports = router;
