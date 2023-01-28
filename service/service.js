const Friend = require("../schemas/friendSchema");
const News = require("../schemas/newsSchema");

const listFriends = async () => {
  return await Friend.find();
};

const listNews = async () => {
  return await News.find();
};

module.exports = { listFriends, listNews };
