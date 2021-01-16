var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var db = require("../models/database");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let [user, created] = await db.Students.findOrCreate({
          where: {
            id: profile._json.sub, //TODO: study this further
            email: profile._json.email,
          },
        }); // get instance returned by promise
        // 'created' is unimportant to us
        done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  //TODO: might fail?\
  try {
    let student = await db.Students.findByPk(id);
    done(null, student);
  } catch (error) {
    done(error);
  }
});

module.exports.passport = passport;

module.exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Not authenticated.");
  }
};
