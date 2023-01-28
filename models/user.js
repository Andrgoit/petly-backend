const { model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const userSchema = require("../schemas/userSchema");

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
