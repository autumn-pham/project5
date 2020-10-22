const express = require('express');
const searches = express.Router();
const postgres = require('../postgres.js');

// INDEX
searches.get('/', (req, res) => {
  postgres.query('SELECT * FROM searches ORDER BY id ASC;', (err, results) => {
      res.render('main_activities/index.html.ejs', {searches: results.rows})
  });
});


module.exports = searches;
