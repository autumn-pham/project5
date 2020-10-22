const express = require('express');
const offers = express.Router();
const postgres = require('../postgres.js');


// EDIT
offers.get('/offers/:id/edit', (req, res) => {
  postgres.query(`SELECT * FROM offers WHERE id = ${req.params.id};`, (err, results) => {
      res.render('main_activities/edit.html.ejs', {offer: results})
      console.log(err)
  });
});

// SHOW
offers.get('/offers/:id', (req, res) => {
  postgres.query(`SELECT * FROM offers WHERE id = ${req.params.id};`, (err, results) => {
      console.log(results)
      res.render('main_activities/show.html.ejs', {offer: results})
  });
});

// UPDATE
offers.put('/offers/:id', (req, res) => {
    postgres.query(`UPDATE offers SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', AGE = ${req.body.age}, CITY = ${req.body.city}, SPORT = ${req.body.sport}, ACTIVITY = ${req.body.activity}, WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM offers ORDER BY id ASC;', (err, results) => {
          res.redirect('/activities');
        });
    })
});

// INDEX
offers.get('/', (req, res) => {
  postgres.query('SELECT * FROM offers ORDER BY id ASC;', (err, results) => {
      res.render('main_activities/index.html.ejs', {offers: results.rows})
  });
});

// CREATE
offers.post('/', (req, res) => {
  postgres.query(`INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.age}', '${req.body.city}', '${req.body.sport}', '${req.body.activity}')`, (err, results) => {
  postgres.query('SELECT * FROM offers ORDER BY id ASC;', (err, results) => {
    console.log(err);
    res.redirect('/activities');
  });
  })
});


module.exports = offers;
