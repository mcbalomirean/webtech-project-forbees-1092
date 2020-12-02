var express = require('express');
var router = express.Router();
var db = require('../models/database');

router.get('/api', function(req, res, next) {
    res.status(200).send('Express API is functional.');
});

router.get('/database/creation', async function(req, res, next) {
    try {
        await db.sequelize.sync({ force: true });
        res.status(201).send('Database tables created.');
    } catch (error) {
        res.status(500).send('Database tables not created.');
        console.log(error);
    }
});

module.exports = router;