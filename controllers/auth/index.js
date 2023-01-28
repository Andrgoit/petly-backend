// const updateAvatar = require("../../middlewares/updateAvatar");
const createToken = require("../../helpers/createToken");
const serviceUser = require("../../service/user");

const { getFileUrl, HttpError } = require("../../helpers");

const mainDir = "users";
const sizeAvatar = [233, 233];

const registration = async (req, res, next) => {
  const { email, password, name, location, phone } = req.body;

  const user = await serviceUser.getUser(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await serviceUser.addUser(
    email,
    name,
    location,
    phone,
    password
  );

  res.status(201).json({
    email,
    name: newUser.name,
    location: newUser.location,
    phone: newUser.phone,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await serviceUser.getUser(email);

  if (!user || !user.validPassword(password)) {
    throw HttpError(409, "Email or password is wrong");
  }

  const { _id } = user;

  const token = createToken(_id);

  await serviceUser.updateToken(_id, token);

  res.status(200).json({ token });
};

const logout = async (req, res, next) => {
  await serviceUser.updateToken(req.user.id, null);

  res.status(204).json();
};

const update = async (req, res, next) => {
  const { fieldName } = req.params;
  let value = req.body[fieldName];
  const { _id } = req.user;

  if (fieldName === "avatar") {
    value = getFileUrl(req.file, mainDir, _id, sizeAvatar);
  }

  const body = { [fieldName]: value };

  const result = await serviceUser.updateUser(_id, body);

  if (result) {
    return res.status(200).json(body);
  }
};

module.exports = {
  registration,
  login,
  logout,
  update,
};
