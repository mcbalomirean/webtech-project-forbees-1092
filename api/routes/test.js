var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/api', function(req, res, next) {
    res.status(200).send('Express API is functional.');
});

router.get('/database/creation', function(req, res, next) {
    db.sequelize.sync( { force: true } ).then(() => {
        res.status(201).send('Database tables created.');
    }).catch((err) => {
        res.status(500).send('Database tables not created.');
        console.log(err);
    });
});

module.exports = router;