var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');

router.get('/google',
    authController.authenticate('google', { scope: ['profile', 'email'] })
);

//callback route
//TODO: test redirect
router.get('/callback',
    authController.authenticate('google', { scope: ['profile', 'email'], failureRedirect: '/login' }),
    function(req, res) {
        //TODO: change
        // res.send(req.user);
        res.redirect('/test/auth');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = router;