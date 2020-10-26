const express = require('express');
const app = express();
const methodOverride  = require('method-override');
// const bcrypt = require("bcrypt");
// const session = require('express-session');
// const passport = require('passport');
const flash = require('connect-flash');
const postgres = require('./postgres.js');
// require('./passport.js')
// require("dotenv").config();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

const offersController = require('./controllers/offers.js');
app.use('/offers', offersController);

const searchesController = require('./controllers/searches.js');
app.use('/searches', searchesController);

const matchesController = require('./controllers/matches.js');
app.use('/matches', matchesController);

const homeController = require('./controllers/home.js');
app.use('/home', homeController);

// const usersController = require('./controllers/users.js');
// app.use('/login', usersController);
//
// const sessionsController = require('./controllers/sessions.js');
// app.use('/register', sessionsController);
//
// app.use(function(req, res, next){
//   res.locals.message = req.flash('message');
//   next();
// });

app.get('/' , (req, res) => {
  res.redirect('/home');
});

app.get('/workouts' , (req, res) => {
  res.render('workouts/index.html.ejs');
});

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('👂 on ' + PORT);
})
