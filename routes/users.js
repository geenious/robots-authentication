const router = require('express').Router();
const User = require('../models/profiles');

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/users', function(req, res) {
  User.find({}).then(function(results) {
    res.render('users', { users: results });
  });
});

router.get('/profile/:id', function(req, res) {
  let robotId = req.params.id;

  User.findById(robotId).then((results) => {
    res.render('profile', results);
  });
});

router.get('/forHire', function(req, res) {
  User.find({ job: { $type: 10 } }).then((results) => {
    res.render('index', { users: results });
  });
});

router.get('/workingRobots', function(req, res) {
  User.find({ job: { $type: 2 } }).then((results) => {
    res.render('index', { users: results });
  });
});

module.exports = router;
