var express = require('express');
var router = express.Router();
var db = require('../models/Database');
var AuthController = require('../controllers/AuthController');
var NotesController = require('../controllers/NotesControllers');

router.get('/api', function(req, res) {
    res.status(200).send('Express API is functional.');
});

router.get('/auth', AuthController.checkAuth, function(req, res) {
    res.status(200).send(req.user);
});

router.get('/db/creation', async function(req, res) {
    try {
        await db.sequelize.sync({ force: true });
        res.status(201).send('Database tables created.');
    } catch (error) {
        res.status(500).send('Database tables not created.');
        console.log(error);
    }
});

// TODO: remove these
router.get('/db/findnote/:id', NotesController.findOne);

router.post('/db/createnote', NotesController.create);

module.exports = router;