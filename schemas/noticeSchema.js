const { Schema, SchemaTypes } = require("mongoose");

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lostfound", "ingoodhands"],
      required: [true, "Notice type is required"],
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Set title for notice"],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      default: null,
    },
    birthdate: {
      type: Date,
      // transform: (v) => (v === null ? null : v.toLocaleDateString()),
      default: null,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      default: null,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "The sex is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      default: null,
      // min: [1, "Price must be greater than 0"],
      // required: [true, "price is required"],
    },
    avatar: {
      public_id: { type: String, default: null },
      url: { type: String, default: null },
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
      required: [true, "Comments is required"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

module.exports = noticeSchema;
