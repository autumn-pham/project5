const PORT = process.env.PORT
const express = require('express');
const app = express();
const methodOverride  = require('method-override');
const bcrypt = require("bcrypt");
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const postgres = require('./postgres.js');
require('./passport.js')
require("dotenv").config();
const initializePassport = require("./passport.js");
initializePassport(passport);


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const offersController = require('./controllers/offers.js');
app.use('/offers', offersController);

const searchesController = require('./controllers/searches.js');
app.use('/searches', searchesController);

const matchesController = require('./controllers/matches.js');
app.use('/matches', matchesController);

const homeController = require('./controllers/home.js');
app.use('/home', homeController);


app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/workouts' , (req, res) => {
  res.render('workouts/index.html.ejs');
});

app.get("/register", checkAuthenticated, (req, res) => {
  res.render("users/register.html.ejs");
});

app.get("/login", checkAuthenticated, (req, res) => {
  // console.log(req.session.flash.error);
  res.render("users/login.html.ejs");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("users/login.html.ejs", {user: req.user.username});
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("You have successfully logged out." );
});

app.post("/register", async (req, res) => {
  let { first_name, last_name, username, password, passConf } = req.body;

  let errors = [];

  // console.log(first_name, last_name, username, password, passConf);

  if (!first_name || !last_name || !username || !password || !passConf) {
    errors.push({ message: "Please enter all fields." });
  }

  if (password.length < 8) {
    errors.push({ message: "Password must be a least 8 characters long." });
  }

  if (password !== passConf) {
    errors.push({ message: "Passwords do not match." });
  }

  if (errors.length > 0) {
    res.render("users/register.html.ejs", { errors, first_name, last_name, username, password, passConf });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    postgres.query(
      `SELECT * FROM users
        WHERE username = $1`,
      [username],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("users/register.html.ejs", {
            message: "User already registered."
          });
        } else {
          postgres.query(
            `INSERT INTO users (first_name, last_name, username, password)
                VALUES ($1, $2, $3, $4)
                RETURNING username, password`,
            [first_name, last_name, username, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              req.flash("success_msg", "You are now registered! Please log in.");
              res.redirect("/login");
            }
          );
        }
      }
    );
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('👂 on ' + PORT);
})
