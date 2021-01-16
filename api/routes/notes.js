var express = require("express");
var router = express.Router();
const NotesController = require("../controllers/NotesController");

router.post("/", NotesController.create);

router.get("/", NotesController.findAll);
router.get("/:id", NotesController.findOne);
router.get("/:id/content", NotesController.getContents);

router.delete("/:id", NotesController.delete);

router.put("/:id", NotesController.put);

module.exports = router;