const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");

const controller = require("../../../controllers/user");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");
const validateBody = require("../../../middlewares/validateBody");
const { validateParamsID } = require("../../../middlewares/validateParamsID");

const schemas = require("../../../schemas/joiSchemas/petForms");


router.get("/current", authenticate, controllerWrappers(controller.get));

// ****************8
router.get("/current/Myroslava", controllerWrappers(controller.getId));
// ****************8

router.post(
  "/pets",
  authenticate,
  validateBody(schemas.joiPetForms),
  upload.single("avatar"),
  controllerWrappers(controller.create)
);

router.delete("/pets/:id",validateParamsID, authenticate, controllerWrappers(controller.remove));

module.exports = router;
