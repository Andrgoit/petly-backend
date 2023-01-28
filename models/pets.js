const { model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const petSchema = require("../schemas/petSchema");

petSchema.post("save", handleMongooseError);

const Pet = model("pet", petSchema);

module.exports = Pet;
