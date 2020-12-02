var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/api', function(req, res, next) {
    res.send('Express API is functional.').status(200);
});

router.get('/database/creation', function(req, res, next) {
    db.sequelize.sync( { force: true }).then(/* async */ () => {
        res.send('Database tables created.').status(201);
    }).catch((err) => {
        res.send('Database tables not created.').status(500);
        console.error(err);
    });
});

module.exports = router;