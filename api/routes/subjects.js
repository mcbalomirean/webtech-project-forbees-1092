var express = require("express");
var router = express.Router();
const SubjectsController = require("../controllers/SubjectsController");

router.get("/", SubjectsController.findAll);

router.get("/names", SubjectsController.findAllNames);

module.exports = router;
