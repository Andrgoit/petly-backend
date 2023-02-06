const express = require("express");
const router = express.Router();

const { controllerWrappers } = require("../../../helpers");

const controller = require("../../../controllers/notice");
const authenticate = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/upload");
const validateNoticeForm = require("../../../middlewares/validateNoticeForm");
const { validateParamsID } = require("../../../middlewares/validateParamsID");

router.get("/category/:categoryName", controllerWrappers(controller.get));

router.get("/notice/:id",validateParamsID, controllerWrappers(controller.getById));

router.delete(
  "/notice/:id",
  validateParamsID,
  authenticate,
  controllerWrappers(controller.remove)
);

router.post(
  "/notice",
  authenticate,
  upload.single("avatar"),
  validateNoticeForm,

  controllerWrappers(controller.create)
);

router.get(
  "/favorite",
  authenticate,
  controllerWrappers(controller.getUserFavorites)
);
router.post(
  "/favorite/:id",
  validateParamsID,
  authenticate,
  controllerWrappers(controller.addNoticeToFavorite)
);

router.delete(
  "/favorite/:id",
  validateParamsID,
  authenticate,
  controllerWrappers(controller.removeNoticeWithFavorite)
);

router.get(
  "/current",
  authenticate,
  controllerWrappers(controller.getUserNotices)
);

module.exports = router;
