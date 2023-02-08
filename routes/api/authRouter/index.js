const express = require("express");
const router = express.Router();

const passport = require("../../../middlewares/passport");
// const authGoogle = require("./controller/authGoogle");

const { controllerWrappers } = require("../../../helpers");
const controller = require("../../../controllers/auth");

const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");

const validateBody = require("../../../middlewares/validateBody");
const schemas = require("../../../schemas/joiSchemas/users");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }) // authgoogle
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/failure",
  }),
  controllerWrappers(controller.authGoogle)
);

router.get("/google/failure", (req, res) => {
  res.status(404).send({ message: "something went wrong..." });
});

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
  validateBody(schemas.joiUpdateUserSchema),
  controllerWrappers(controller.update)
);

module.exports = router;
