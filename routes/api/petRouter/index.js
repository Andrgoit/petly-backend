const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");

const controller = require("../../../controllers/pet");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");
const validateBody = require("../../../middlewares/validateBody");
const { validateParamsID } = require("../../../middlewares/validateParamsID");

const schemas = require("../../../schemas/joiSchemas/petForms");

router.post(
  "/",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.joiPetForms),
  controllerWrappers(controller.create)
);

router.delete(
  "/:id",
  authenticate,
  validateParamsID,
  controllerWrappers(controller.remove)
);

module.exports = router;
