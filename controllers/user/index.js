const { listPets } = require("../../service/pet");

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

module.exports = { get };
