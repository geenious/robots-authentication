const router = require('express').Router();

router.get('/', function(req, res) {
  db.collection('users')
  .find({})
  .toArray(function(err, results) {
    res.render('index', { users: results });
  })
});

router.get('/profile/:id', function(req, res) {
  db.collection('users')
  .find({ id: Number(req.params.id) })
  .toArray(function(err, results) {
    res.render('profile', results[0] );
  })
});

router.get('/forHire', function(req, res) {
  db.collection('users')
  .find({ job: { $type: 10 } })
  .toArray(function(err, results) {
    res.render('index', { users: results });
  })
});

router.get('/workingRobots', function(req, res) {
  db.collection('users')
  .find({ job: { $type: 2 } })
  .toArray(function(err, results) {
    res.render('index', { users: results })
  })
});

module.exports = router;
