const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");
const controller = require("../../../controllers/auth");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");

const validateBody = require("../../../middlewares/validateBody");
const schemas = require("../../../schemas/joiSchemas/users");

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  controllerWrappers(controller.registration)
); // validateUser

router.post(
  "/login",
  validateBody(schemas.joiLoginSchema),
  controllerWrappers(controller.login)
); // validateUser//

router.post("/logout", authenticate, controllerWrappers(controller.logout));

router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
  controllerWrappers(controller.update)
);

module.exports = router;
