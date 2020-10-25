const express = require('express');
const matches = express.Router();
const postgres = require('../postgres.js');

matches.get('/', (req, res) => {
  postgres.query('SELECT offers.firstname, offers.lastname, searches.fname, searches.lname, searches.city, searches.sport, searches.activity FROM offers INNER JOIN searches ON offers.city = searches.city AND offers.sport = searches.sport AND offers.activity = searches.activity;', (err, results)=> {
      res.render('matches/index.html.ejs', {matches: results.rows})
      // console.log(results)
  });
});

module.exports = matches;
