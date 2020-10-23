const express = require('express');
const home = express.Router();
const postgres = require('../postgres.js');

// INDEX
home.get('/', async (req, res) => {
  const query1 = await postgres.query('SELECT * FROM offers ORDER BY id ASC;');
  const query2 = await postgres.query('SELECT * FROM searches ORDER BY id ASC;');
  res.render('home/index.html.ejs', {offers: query1.rows, searches: query2.rows})
  // console.log(query1, query2)
});


module.exports = home;
