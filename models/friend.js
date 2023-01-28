const { model } = require("mongoose");

const friendSchema = require("../schemas/friendSchema");

const Friend = model("pet", friendSchema);

module.exports = Friend;
