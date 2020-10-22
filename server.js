const express = require('express');
const app = express();
const methodOverride  = require('method-override')
const postgres = require('./postgres.js');
const PORT = process.env.PORT

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const offersController = require('./controllers/offers.js');
app.use('/offers', offersController);

// const searchesController = require('./controllers/searches.js');
// app.use('/searches', searchesController);


app.get('/' , (req, res) => {
  res.redirect('/activities');
});

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('👂 on ' + PORT);
})
