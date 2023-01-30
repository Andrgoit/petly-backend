const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");
const controller = require("../../../controllers/auth");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");

router.post("/register", controllerWrappers(controller.registration));

router.post("/login", controllerWrappers(controller.login));

router.post("/logout", authenticate, controllerWrappers(controller.logout));

router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
  controllerWrappers(controller.update)
);

module.exports = router;
