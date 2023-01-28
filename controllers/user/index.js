const { getFileUrl, removeFile } = require("../../helpers");

const { addPet, listPets, removePet } = require("../../service/pet");
const Pet = require("../../models/pets");

// const avatarDir = path.join(process.cwd(), "public", "pets");

const mainDir = "pets";
const sizeAvatar = [240, 240];

const get = async (req, res, next) => {
  const { _id, email, name, location, phone, avatar, birthdate } = req.user;

  const result = await listPets(_id);

  res.status(200).json({
    user: { email, name, location, phone, avatar, birthdate },
    pets: result,
  });
};

const create = async (req, res, next) => {
  const { name, birthdate, breed, comments } = req.body;
  const owner = req.user._id;

  const newPet = new Pet({ name, birthdate, breed, comments, owner });

  if (req.file) {
    const avatarUrl = getFileUrl(req.file, mainDir, newPet._id, sizeAvatar);

    newPet.avatar = avatarUrl;
  }

  const result = await addPet(newPet);

  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const result = await removePet(id);

  if (result) {
    if (result.avatar) {
      removeFile(result.avatar);
    }

    res.status(204).json();
  }

  res.status(404).json({ message: "Pet not found" });
};

module.exports = { get, create, remove };
