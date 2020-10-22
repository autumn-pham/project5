const express = require('express');
const offers = express.Router();
const postgres = require('../postgres.js');

// INDEX
offers.get('/', (req, res) => {
  postgres.query('SELECT * FROM offers ORDER BY id ASC;', (err, results) => {
      res.render('main_activities/index.html.ejs', {offers: results.rows})
  });
});


module.exports = offers;
