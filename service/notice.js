const Notice = require("../models/notice");
const User = require("../models/user");

const listNoticesByCategory = async (category) => {
  const filterResponse = ["title", "breed", "location", "birthdate", "avatar"];

  if (category === "sell") {
    filterResponse.push("price");
  }

  return Notice.find({ category }, filterResponse);
};

const getById = async (_id) => {
  return Notice.findOne({ _id });
};

const addNotice = async (body) => {
  return Notice.create(body);
};

const updateNoticeAvatar = async (_id, avatar) => {
  return Notice.findByIdAndUpdate(
    _id,
    { avatar: avatar },
    { returnDocument: "after" }
  );
};

const removeNotice = async (id, userId) => {
  return Notice.findOneAndDelete({ _id: id, owner: userId });
};

const addNoticeToFavoriteList = async (_id, noticeId) => {
  return User.findOneAndUpdate(
    { _id },
    { $push: { favorite: noticeId } },
    { returnDocument: "after" }
  );
};

const removeWithFavoriteList = async (_id, noticeId) => {
  return User.findOneAndUpdate(
    { _id },
    { $pull: { favorite: noticeId } },
    { returnDocument: "after" }
  );
};
// повертає список оголошень доданих в обрані
const listUserNoticeFavorites = async (userId) => {
  return User.findOne(userId, { favorite: 1, _id: 0 });
};

const listUserNotices = async (userId) => {
  return Notice.find({ owner: userId }, { owner: 0 });
};

module.exports = {
  addNotice,
  updateNoticeAvatar,
  listNoticesByCategory,
  addNoticeToFavoriteList,
  removeWithFavoriteList,
  listUserNoticeFavorites,
  listUserNotices,
  removeNotice,

  getById,
};
