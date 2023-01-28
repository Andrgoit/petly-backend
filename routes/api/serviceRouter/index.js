const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");
const controller = require("../../../controllers/service");

router.get("/friends", controllerWrappers(controller.getFriends));

router.get("/news", controllerWrappers(controller.getNews));

module.exports = router;
