const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");

const controller = require("../../../controllers/user");

const authenticate = require("../../../middlewares/authenticate");

router.get("/current", authenticate, controllerWrappers(controller.get));

module.exports = router;
