const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const app = express();

let mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', data);
});

app.get('/profile/:id', function (req, res) {

  // I have an id
  // I need to get a specific item
  // Use the find function
  let robot = data.users.find(function(item) {
    // console.log(item.name, item.id == req.params.id);
    return item.id == req.params.id;
  });



  console.log(robot);
  res.render('profile', robot);
});

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
