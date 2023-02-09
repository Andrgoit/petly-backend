const Notice = require("../models/notice");
const User = require("../models/user");

const filterResponse = [
  "title",
  "breed",
  "location",
  "birthdate",
  "avatar",
  "category",
  "owner",
];

const listNoticesByCategory = async (category) => {
  if (category === "sell") {
    filterResponse.push("price");
  }

  return Notice.find({ category }, filterResponse).sort({ _id: -1 });
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

const removeNotice = async (_id, userId) => {
  return Notice.findOneAndDelete({ _id, owner: userId });
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
  const { favorite } = await User.findById(userId);
  const notices = await Notice.find({ _id: favorite }, filterResponse).sort({
    _id: -1,
  });

  return notices;
};

const listUserNotices = async (userId) => {
  return Notice.find({ owner: userId }, filterResponse).sort({
    _id: -1,
  });
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
