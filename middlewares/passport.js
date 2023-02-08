const { Strategy } = require("passport-google-oauth2");
const passport = require("passport");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { addUser } = require("../service/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/api/auth/google/callback",
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email } = profile;
    const name = Object.values(profile.name).reverse().join(" ") || null;

    const location = null;
    const phone = null;
    // const name = (...data) || null;

    const user = await User.findOne({ email });

    if (user) {
      // console.log("USER present in base");
      return done(null, user);
    }
    // console.log("USER not present in base");

    const password = uuid.v1();
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await addUser(email, name, location, phone, hashPassword);

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
