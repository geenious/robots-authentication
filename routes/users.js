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
  // console.log('the user?', req.user);
  User.find({}).then(function(results) {
    res.render('users', { users: results });
  });
});

router.get('/profile/:id', authRequired, function(req, res) {
  if (req.user._id == req.params.id) {
    res.redirect('/userprofile')
  } else {
    console.log('user id?', req.params.id);
    let robotId = req.params.id;

    User.findById(robotId).then((results) => {
      res.render('profile', results);
    });
  }
});

router.get('/profile/edit/:id', authRequired, (req, res) => {
  let robotId = req.params.id;

  User.findById(robotId).then(results => {
    res.render('profileedit', results);
  })
});

router.get('/userprofile', authRequired, (req, res) => {
  res.render('userprofile', req.user);
})

router.post('/profile/edit/:id', authRequired, (req, res) => {
  let robotId = req.params.id;

  console.log(req.body);

  User.findByIdAndUpdate(robotId, { $set: req.body}, function(err, results) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(results);
    }
  });
  res.redirect('/users');
});

router.post('/profile/delete/:id', authRequired, (req, res) => {
  let robotid = req.params.id;

  User.findByIdAndRemove(robotid, (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.redirect('/users');
    }
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
