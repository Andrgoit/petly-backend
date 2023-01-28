const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");
const controller = require("../../../controllers/auth");
// const {
//   validateUser,
//   validateUpdateField,
// } = require("../../middlewares/validator");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");

router.post("/register", controllerWrappers(controller.registration)); // validateUser

router.post("/login", controllerWrappers(controller.login)); // validateUser//

router.post("/logout", authenticate, controllerWrappers(controller.logout)); // auth

router.patch(
  "/update/:fieldName",
  authenticate,
  upload.single("avatar"),
  // validateUpdateField,
  controllerWrappers(controller.update)
);

// router.patch("/",
//   controller.updateStatusSubscription // auth, ValidateSubscription
// );

module.exports = router;
