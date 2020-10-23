const express = require('express');
const searches = express.Router();
const postgres = require('../postgres.js');

// EDIT
searches.get('/:id/edit', (req, res) => {
  postgres.query(`SELECT * FROM searches WHERE id = ${req.params.id};`, (err, results) => {
      res.render('searches/edit.html.ejs', {search: results})
      console.log(err)
  });
});

// SHOW
searches.get('/:id', (req, res) => {
  postgres.query(`SELECT * FROM searches WHERE id = ${req.params.id};`, (err, results) => {
      res.render('searches/show.html.ejs', {search: results})
  });
});

// DELETE
searches.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM searches WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM searches ORDER BY id ASC;', (err, results) => {
            res.redirect('/searches');
        });
    });
});

// UPDATE
searches.put('/:id', (req, res) => {
    postgres.query(`UPDATE searches SET fname = '${req.body.fname}', lname = '${req.body.lname}', AGE = '${req.body.age}', CITY = '${req.body.city}', SPORT = '${req.body.sport}', ACTIVITY = '${req.body.activity}' WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM searches ORDER BY id ASC;', (err, results) => {
          console.log(err)
          res.redirect('/searches');
        });
    })
});

// INDEX
searches.get('/', (req, res) => {
  postgres.query('SELECT * FROM searches ORDER BY id ASC;', (err, results) => {
      res.render('searches/index.html.ejs', {searches: results.rows})
  });
});

// CREATE
searches.post('/', (req, res) => {
  postgres.query(`INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.age}', '${req.body.city}', '${req.body.sport}', '${req.body.activity}')`, (err, results) => {
  postgres.query('SELECT * FROM searches ORDER BY id ASC;', (err, results) => {
    res.redirect('/searches');
  });
  })
});


module.exports = searches;
