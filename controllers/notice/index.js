const serviceNotice = require("../../service/notice");
const serviceUser = require("../../service/user");
const {
  uploadToCloudinary,
  removeFileWithCloudinary,
  HttpError,
} = require("../../helpers");
const Notice = require("../../models/notice");

const mainDir = "notices";
const sizeAvatar = [336, 336];

// повертає список оголошень обраної категорії
const get = async (req, res) => {
  const { categoryName } = req.params;

  const result = await serviceNotice.listNoticesByCategory(categoryName);

  res.status(200).json(result);
};

// повертає оголошення по ID
const getById = async (req, res) => {
  const notice = await serviceNotice.getById(req.params.id);

  if (notice) {
    const user = await serviceUser.getUserById(notice.owner);

    if (user) {
      return res.status(200).json({ notice, user });
    }
  }

  throw HttpError(404, "Not found");
};

// додає оголошення
const create = async (req, res) => {
  const owner = req.user._id;

  const {
    category,
    title,
    name,
    birthdate,
    breed,
    comments,
    price,
    sex,
    location,
  } = req.body;

  const newNotice = new Notice({
    category,
    title,
    name,
    birthdate,
    breed,
    comments,
    sex,
    location,
    owner,
  });

  category === "sell" ? (newNotice.price = price) : (newNotice.price = null);

  if (req.file) {
    const avatar = await uploadToCloudinary(
      req.file,
      mainDir,
      newNotice._id,
      sizeAvatar
    );

    newNotice.avatar = avatar;
  }

  const result = await serviceNotice.addNotice(newNotice);

  res.status(201).json(result);
};

// повертає оголошення авторизованого користувача доданих ним же в обрані
const getUserFavorites = async (req, res) => {
  console.log(req.user._id);
  const result = await serviceNotice.listUserNoticeFavorites(req.user._id);

  res.status(200).json(result);
};

// додає оголошення до обраних для авторизованого користувача
const addNoticeToFavorite = async (req, res) => {
  const { id } = req.params;

  const notice = await serviceNotice.getById(id);

  if (notice) {
    const { _id, favorite } = req.user;

    if (!favorite.includes(id)) {
      await serviceNotice.addNoticeToFavoriteList(_id, id);

      return res
        .status(200)
        .json({ message: "The notice has been added to favorites" });
    }

    return res
      .status(400)
      .json({ message: "The notice is in the user's favorites list" });
  }

  res.status(404).json({ message: "Not found" });
};

// видаляє оголошення із списку обраних для авторизованого користувача, ним же доданим
const removeNoticeWithFavorite = async (req, res) => {
  const { id } = req.params;

  const notice = await serviceNotice.getById(id);

  console.log(notice);

  if (notice) {
    const { _id, favorite } = req.user;

    if (favorite.includes(id)) {
      await serviceNotice.removeWithFavoriteList(_id, id);

      return res
        .status(200)
        .json({ message: "The notice deleted with favorites list" });
    }
    return res.status(400).json({
      message: "The notice is not in the favorite list authorize user",
    });
  }

  console.log("test");
  res.status(404).json({ message: "Not found" });
};

// видаляє оголошення авторизованого користувача
const remove = async (req, res) => {
  const { id } = req.params;

  const { _id } = req.user;

  const notice = await serviceNotice.getById(id);

  if (notice) {
    await serviceNotice.removeNotice(id, _id);

    const publicId = notice.avatar.public_id;

    if (publicId) {
      await removeFileWithCloudinary(publicId);
    }

    return res.status(200).json({ message: "Notice deleted" });
  }

  res.status(404).json({ message: "Not found" });
};
// повертає список оголошень користувача
const getUserNotices = async (req, res, next) => {
  try {
    const result = await serviceNotice.listUserNotices(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  addNoticeToFavorite,
  removeNoticeWithFavorite,
  getUserFavorites,
  getUserNotices,
};
