const LocalStrategy = require("passport-local").Strategy;
const postgres = require('./postgres.js');
const bcrypt = require("bcrypt");

function initialize(passport) {

  const authenticateUser = (username, password, done) => {
    console.log(username, password);
    postgres.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Your username and password do not match" });
            }
          });
        } else {
          return done(null, false, {
            message: "No user found"
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.username));


  passport.deserializeUser((username, done) => {
    postgres.query(`SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`Username is ${results.rows[0].username}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
