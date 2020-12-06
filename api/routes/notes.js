var express = require('express');
var router = express.Router();

const notesController = require('../controllers/NotesControllers')
var db = require('../models/database');  


// create

// TO-DO: async await
router.get('/notes', async (req, res) => {
    // parametru let db... = await db.notes.findall in try catch, works:res stat 200
    db.Notes.findAll().then(
        (results) => {
            res.status(200).send({
                status: "success",
                results: results
            });

        }
    ).catch(() => {
        res.status(500).send({
            status: "error"
        })
    })
});

// pot sa iau note/:id, cu id-ul userului


// async await la majoritatea
router.get('/notes/:title', async(req, res) => {
    // findone...(where...)
    db.Notes.findByPk(req.params.title, {
        include: [{
            model: db.Notes
        }]

    }).then(
        (result) => {
            if(result){
                res.status(200).send(result)
            }
            else{
                res.status(404).send()
            }
        }
    )
});




// router.get('/notes', notesController.findAll)
router.get('/notes/:id', notesController.findOne)  //check authentification...
// router.get('/notes/:id/notes', notesController.findNotes)


// create note
router.post('/notes', notesController.createNote)

// 
// router.get()

router.post('/notes/:id/')






module.exports = router;