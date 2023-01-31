const Notice = require("../models/notice");

const listNoticesByCategory = async (category) => {
  const filterResponse = ["title", "breed", "location", "birthdate", "avatar"];

  if (category === "sell") {
    filterResponse.push("price");
  }

  return Notice.find({ category }, filterResponse);
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

const getById = async (_id) => {
  return Notice.findOne({ _id });
};

const removeNotice = async (id, userId) => {
  return Notice.findOneAndDelete({ _id: id, owner: userId });
};

const addToFavoriteList = async (noticeId, userId) => {
  return Notice.findOneAndUpdate(
    { _id: noticeId },
    { $push: { favorite: userId } },
    { returnDocument: "after" }
  );
};

const removeWithFavoriteList = async (noticeId, userId) => {
  return Notice.findOneAndUpdate(
    { _id: noticeId },
    { $pull: { favorite: userId } },
    { returnDocument: "after" }
  );
};

const listFavoriteNotice = async (userId) => {
  return Notice.find({ favorite: [userId] }, { favorite: 0, owner: 0 });
};

const listNotices = async (userId) => {
  return Notice.find({ owner: userId }, { favorite: 0, owner: 0 });
};

module.exports = {
  addNotice,
  updateNoticeAvatar,
  listNoticesByCategory,
  addToFavoriteList,
  removeWithFavoriteList,
  listFavoriteNotice,
  listNotices,
  removeNotice,

  getById,
};
