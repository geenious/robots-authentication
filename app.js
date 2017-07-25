const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
