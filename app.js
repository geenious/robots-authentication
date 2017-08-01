const express = require('express');
const mustacheExpress = require('mustache-express');
const routes = require('./routes/users.js');

const app = express();

let mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use('/', routes);

app.listen(3000, function() {
  console.log('Listening to port 3000');
});
