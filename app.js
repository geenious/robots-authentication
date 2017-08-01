const express = require('express');
const mustacheExpress = require('mustache-express');
// const routes = require('./routes/users.js');
const mongoClient = require('mongodb').MongoClient();

const app = express();

let mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// app.use('/', routes);

express.response.debugRender = function(template, data) {
  data.json = JSON.stringify(data, null, '/t');
  this.render(template, data);
};

const url = 'mongodb://localhost:27017/robots';

app.get('/', function(req, res) {
  db.collection('users')
  .find({})
  .toArray(function(err, results) {
    res.render('index', { users: results });
  })
});

app.get('/profile/:id', function(req, res) {
  db.collection('users')
  .find({ id: Number(req.params.id) })
  .toArray(function(err, results) {
    res.render('profile', results[0] );
  })
});

app.get('/forHire', function(req, res) {
  db.collection('users')
  .find({ job: { $type: 10 } })
  .toArray(function(err, results) {
    res.render('index', { users: results });
  })
});

app.get('/workingRobots', function(req, res) {
  db.collection('users')
  .find({ job: { $type: 2 } })
  .toArray(function(err, results) {
    console.log(results);
    res.render('index', { users: results })
  })
});

let db;

mongoClient.connect(url, function(err, database) {
  if (err) {
    console.error(err);
  }
  else {
    db = database;
    app.listen(3000, function() {
      console.log('Listening to port 3000');
    });
  }
});
