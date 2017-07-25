const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', data);
});

app.get('/:id', function (req, res) {
  res.send(req.params.id);
});

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
