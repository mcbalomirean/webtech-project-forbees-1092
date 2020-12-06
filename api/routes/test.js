var express = require('express');
var router = express.Router();
var db = require('../models/Database');
var authController = require('../controllers/AuthController');
var notesController = require('../controllers/NotesControllers');

router.get('/api', function(req, res) {
    res.status(200).send('Express API is functional.');
});

router.get('/auth', authController.checkAuth, function(req, res) {
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
// router.get('/db/findnote/:id', notesController.findOne);

router.get('/db/findOne/:id', notesController.findOne);

router.post('/db/createnote', notesController.create);

router.delete('/db/delete/:id', notesController.delete);

// router.put('/db/put/:id', notesController.create);

router.get('/db/findAll', notesController.findAll);

module.exports = router;