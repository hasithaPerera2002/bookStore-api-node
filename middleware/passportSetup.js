const passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "30387854277-b6r93h5il4gnfcnfj9sgct3hqk9kot39.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://localhost:3000/api/v1/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
