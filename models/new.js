const { model } = require("mongoose");

const newsSchema = require("../schemas/newsSchema");

const News = model("pet", newsSchema);

module.exports = News;
