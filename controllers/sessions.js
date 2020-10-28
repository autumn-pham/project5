const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const postgres = require('./postgres.js');

sessions.get('/register', (req, res) => {
  res.render('users/register.html.ejs', {
    currentUser:req.session.currentUser
  })
})


sessions.post('/', (req, res) => {

  postgres.query('SELECT id, "username", "password" FROM "users" WHERE "username"=$1', [username], (err, result) => {
    if (err) {
      console.log(err)
      res.send('The database is down')
    } else if (!foundUser) {
      res.send('<a href="/register">Sorry, no user found. Please sign up. </a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/"> Your username or password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions;
