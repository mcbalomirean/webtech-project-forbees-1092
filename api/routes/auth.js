var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');

router.get('/login',
  authController.passport.authenticate('google', { scope: ['profile', 'email'] })
);

//callback route
//TODO: test redirect, change it
router.get('/callback',
  authController.passport.authenticate('google', { scope: ['profile', 'email'], successRedirect: '/test/auth', failureRedirect: '/login' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send('Logged out, all good.');
});

module.exports = router;