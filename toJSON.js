const robots = require('./models/data.js');

robots.users.forEach(function(robot) {
  console.log(JSON.stringify(robot));
});
