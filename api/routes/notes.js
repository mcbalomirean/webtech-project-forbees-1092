var express = require("express");
var router = express.Router();
const NotesController = require("../controllers/NotesController");

router.post("/", NotesController.create);

router.get("/", NotesController.findAll);
router.get("/:id", NotesController.findOne);
router.get("/:id/contents", NotesController.getContents);

router.delete("/:id", NotesController.delete);

router.put("/:id", NotesController.put);
router.post("/:id/share/students/:email", NotesController.shareNoteWithStudent);
router.post("/:id/share/groups/:name", NotesController.shareNoteWithGroup);

module.exports = router;
