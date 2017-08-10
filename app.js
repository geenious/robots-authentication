const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const routes = require('./routes/users');
const auth = require('./routes/auth');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

/****** MONGOOSE SETUP  ******/

mongoose.connect('mongodb://localhost:27017/robots', { useMongoClient: true });
mongoose.Promise = global.Promise;

/****** APP SETUP ******/

const app = express();

/******  SESSION SETUP  ******/

app.use(session({
  secret: 'fantasy',
  resave: false,
  saveUninitialized: false
}));

/****** PASSPORT SETUP ******/

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig').configure(passport);

app.use(bodyParser.urlencoded({ extended: false })); // handles post bodies
app.use('/', routes);
app.use('/', auth);

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
