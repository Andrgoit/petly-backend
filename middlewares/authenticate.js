const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const secret = process.env.SECRET;

const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const [typeToken, token] = req.headers.authorization?.split(" ") || "";

    if (token && typeToken === "Bearer") {
      const decoded = jwt.decode(token, secret);

      if (decoded) {
        const user = await User.findOne({ _id: decoded._id });

        if (token === user.token) {
          req.user = user;

          return next();
        }
      }
    }

    throw HttpError(401, "Not authorized");
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
