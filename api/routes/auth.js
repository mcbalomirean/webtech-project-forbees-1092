var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');

router.get('/login', (req, res, next) => {
    // We get the referrer and store it in the user session so we know where
    // to send them back to after authenticating.
    req.session.backUrl = req.get('Referrer');
    next();
  },
  authController.passport.authenticate('google', { scope: ['profile', 'email'] })
);

//callback route
//TODO: test redirect, change it
router.get('/callback',
  authController.passport.authenticate('google', { scope: ['profile', 'email'], successRedirect: '/auth/redirect', failureRedirect: '/auth/login' })
);

//TODO: test, improve? add errors?
router.get('/redirect', (req, res) => {
  res.status(301).redirect(req.session.backUrl);
});

router.get('/status', (req, res) => {
  if (req.user) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
})

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).end();
});

module.exports = router;