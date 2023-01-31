const path = require("path");
const fs = require("fs/promises");

const service = require("../../service/notice");
const serviceUser = require("../../service/user");
const {
  uploadToCloudinary,
  removeFileWithCloudinary,
  HttpError,
} = require("../../helpers");
const Notice = require("../../models/notice");

const mainDir = "notices";
const sizeAvatar = [336, 336];

const avatarDir = path.join(process.cwd(), "public", "notices");

const get = async (req, res) => {
  const { categoryName } = req.params;

  const result = await service.listNoticesByCategory(categoryName);

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const notice = await service.getById(req.params.id);

  console.log(notice);
  if (notice) {
    const user = await serviceUser.getUserById(notice.owner);

    console.log(user);

    if (user) {
      return res.status(200).json({ notice, user });
    }
  }

  throw HttpError(404, "Not found");
};

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

  const result = await service.addNotice(newNotice);

  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const result = await service.removeNotice(req.params.id, req.user._id);

  if (result) {
    const { avatar } = result;

    if (avatar) {
      // видалення файлу
      const fileName = path.basename(avatar);
      const removePath = path.join(avatarDir, fileName);

      fs.rm(removePath);
    }

    return res.status(200).json({ message: "contact deleted" });
  }

  res.status(404).json({ message: "Not found" });
};

const addUserToFavorite = async (req, res, next) => {
  const { id } = req.params;

  let result = await service.getById(id);

  if (result) {
    const { _id } = req.user;

    if (!result.favorite.includes(_id)) {
      result = await service.addToFavoriteList(id, _id);
    }

    console.log(result);
  }

  res.status(404).json({ message: "Not found" });
};

const removeUserWithFavorite = async (req, res, next) => {
  const { id } = req.params;

  let result = await service.getById(id);

  if (result) {
    const { _id } = req.user;

    if (result.favorite.includes(_id)) {
      result = await service.removeWithFavoriteList(id, _id);
    }

    console.log(result);
  }

  res.status(404).json({ message: "Not found" });
};

const getUserFavorites = async (req, res, next) => {
  const result = await service.listFavoriteNotice(req.user._id);

  res.status(200).json(result);
};

const getCurrent = async (req, res, next) => {
  try {
    const result = await service.listNotices(req.user._id);

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

  addUserToFavorite,
  removeUserWithFavorite,
  getUserFavorites,
  getCurrent,
};
