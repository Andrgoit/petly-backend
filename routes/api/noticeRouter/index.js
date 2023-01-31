const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");

const controller = require("../../../controllers/notice");
const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");
const validateNoticeForm = require("../../../middlewares/validateNoticeForm");

router.get("/category/:categoryName", controllerWrappers(controller.get));

router.get("/:id", controllerWrappers(controller.getById));

router.post(
  "/",
  authenticate,
  validateNoticeForm,
  upload.single("avatar"),
  controllerWrappers(controller.create)
);

router.get(
  "/favorites",
  authenticate,
  controllerWrappers(controller.getUserFavorites)
);

router.get("/current", authenticate, controllerWrappers(controller.getCurrent));

router.delete("/:id", authenticate, controllerWrappers(controller.remove));

router.patch(
  "/:id/addfavorite",
  authenticate,
  controllerWrappers(controller.addUserToFavorite)
);

router.patch(
  "/:id/removefavorite",
  authenticate,
  controllerWrappers(controller.removeUserWithFavorite)
);


// router.delete("/:id", auth, controller.remove);

// router.put("/:id", auth, controller.update);

// router.patch("/:id/favorite", auth, controller.updateStatusContact);

module.exports = router;
