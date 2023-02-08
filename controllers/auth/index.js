// const updateAvatar = require("../../middlewares/updateAvatar");
const createToken = require("../../helpers/createToken");
const service = require("../../service/user");
const User = require("../../models/user");

const { uploadToCloudinary, HttpError } = require("../../helpers");

const mainDir = "users";
const sizeAvatar = [233, 233];

const authGoogle = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const token = createToken(_id);

    await service.updateToken(_id, token);

    res.redirect(
      `${process.env.FRONTEND_URL}/petly-team-project/google-redirect/${token}`
    );
  } catch (error) {
    next(error);
  }
};

const registration = async (req, res) => {
  const { email, password, name, location, phone } = req.body;

  const user = await service.getUser(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  await service.addUser(email, name, location, phone, password);

  res.redirect(307, "/api/auth/login");

  // res.status(201).json({
  //   email,
  //   name: newUser.name,
  //   location: newUser.location,
  //   phone: newUser.phone,
  // });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await service.getUser(email);

  if (!user || !user.validPassword(password)) {
    throw HttpError(409, "Email or password is wrong");
  }

  const { _id } = user;

  const token = createToken(_id);

  await service.updateToken(_id, token);

  res.status(200).json({ token });
};

const logout = async (req, res) => {
  await service.updateToken(req.user.id, null);

  res.status(204).json();
};

const update = async (req, res) => {
  const { email, name, location, phone, birthdate } = req.body;

  const user = await service.getUser(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  let avatar;
  const { _id } = req.user;

  if (req.file) {
    const { url } = await uploadToCloudinary(
      req.file,
      mainDir,
      _id,
      sizeAvatar
    );
    avatar = url;
  }

  const result = await service.updateUser(_id, {
    email,
    name,
    location,
    phone,
    birthdate,
    avatar,
  });

  res.status(200).json(result);
};

module.exports = {
  registration,
  login,
  logout,
  update,
  authGoogle,
};
