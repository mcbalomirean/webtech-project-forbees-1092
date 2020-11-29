var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Express API is functional.');
});

module.exports = router;