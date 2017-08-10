const router = require('express').Router();
const User = require('../models/profiles');

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login', function(req, res) {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || user === false) {
      console.log('Problem logging in', err);
      res.redirect('/login');
    } else {
      console.log('Successful login');
      res.redirect('/users');
    }
  });
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save((err) => {
    if (err) {
      console.log('There was an error saving the user.', err);
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router;
