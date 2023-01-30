const { Schema, SchemaTypes } = require("mongoose");
const bCrypt = require("bcryptjs");

// eslint-disable-next-line no-useless-escape
// const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      // match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [7, "Password must contain at least 7 characters"],
      // maxLength: [32, "Password must contain no more than 32 characters"],
    },
    name: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    birthdate: {
      type: Date,
      transform: (v) => v.toLocaleDateString(),
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    favorite: {
      type: Array(SchemaTypes.ObjectId),
      ref: "notice",
      default: [],
    },
  },

  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

// const User = model("user", user);

module.exports = userSchema;
