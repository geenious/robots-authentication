const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');

/****** MONGOOSE SETUP  ******/

mongoose.connect('mongodb://localhost:27017/robots', { useMongoClient: true });
mongoose.Promise = global.Promise;

/****** APP SETUP ******/

const app = express();

/******  MUSTACHE SETUP  ******/

let mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

/****** STATIC FILES  ******/

app.use(express.static('public'));

/****** APP.LISTEN  ******/

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
