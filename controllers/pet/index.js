const {
  uploadToCloudinary,
  removeFileWithCloudinary,
} = require("../../helpers");

const { addPet, removePet } = require("../../service/pet");
const Pet = require("../../models/pets");

const mainDir = "pets";
const sizeAvatar = [240, 240];

const create = async (req, res, next) => {
  const { name, birthdate, breed, comments } = req.body;
  const owner = req.user._id;

  const newPet = new Pet({ name, birthdate, breed, comments, owner });

  if (req.file) {
    const avatar = await uploadToCloudinary(
      req.file,
      mainDir,
      newPet._id,
      sizeAvatar
    );

    newPet.avatar = avatar;
  }

  const result = await addPet(newPet);

  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const result = await removePet(id);

  if (result) {
    const publicId = result.avatar.public_id;

    if (publicId) {
      removeFileWithCloudinary(publicId);
    }

    return res.status(204).json();
  }

  res.status(404).json({ message: "Pet not found" });
};

module.exports = { create, remove };
