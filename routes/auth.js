const router = require('express').Router();
const User = require('../models/profiles');
const passport = require('passport');

router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login'
}));

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

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
})

module.exports = router;
