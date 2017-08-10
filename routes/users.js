const router = require('express').Router();
const User = require('../models/profiles');

router.get('/', function(req, res) {
  res.render('index', {});
});

function authRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/users', authRequired, function(req, res) {
  console.log('the user?', req.user);
  User.find({}).then(function(results) {
    res.render('users', { users: results });
  });
});

router.get('/profile/:id', authRequired, function(req, res) {
  let robotId = req.params.id;

  User.findById(robotId).then((results) => {
    res.render('profile', results);
  });
});

router.get('/forHire', authRequired, function(req, res) {
  User.find({ job: { $type: 10 } }).then((results) => {
    res.render('users', { users: results });
  });
});

router.get('/workingRobots', authRequired, function(req, res) {
  User.find({ job: { $type: 2 } }).then((results) => {
    res.render('users', { users: results });
  });
});

module.exports = router;
