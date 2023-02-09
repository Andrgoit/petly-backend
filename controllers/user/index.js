const {
  uploadToCloudinary,
  removeFileWithCloudinary,
} = require("../../helpers");

const { addPet, listPets, removePet } = require("../../service/pet");
const Pet = require("../../models/pets");
const { getUser } = require("../../service/user");

const mainDir = "pets";
const sizeAvatar = [240, 240];

const getId = async (req, res, next) => {
  const email = "morov78@ukr.net";

  const user = await getUser(email);
  const { _id } = user;

  const result = await listPets(_id);

  user.password = "";
  user.token = null;

  res.status(200).json({
    user,
    pets: result,
  });
};

const get = async (req, res, next) => {
  const { _id, email, name, location, phone, avatar, birthdate, favorite } =
    req.user;

  const pets = await listPets(_id);

  res.status(200).json({
    user: {
      _id,
      email,
      name,
      location,
      phone,
      avatar,
      birthdate,
      favorite,
      pets,
    },
  });
};

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

module.exports = { getId, get, create, remove };
