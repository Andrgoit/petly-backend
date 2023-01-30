const { model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const noticeSchema = require("../schemas/noticeSchema");

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

module.exports = Notice;
