var express = require("express");
var router = express.Router();
var db = require("../models/Database");
var AuthController = require("../controllers/AuthController");
var NotesController = require("../controllers/NotesController");
var subjects = require("../data/subjects.json");
var students = require("../data/sample_students.json");
var groups = require("../data/sample_groups.json");
var notes = require("../data/sample_notes.json");
var members = require("../data/sample_groupMembers.json");

router.get("/api", function (req, res) {
  res.status(200).send("Express API is functional.");
});

router.get("/auth", AuthController.checkAuth, function (req, res) {
  res.status(200).send(req.user);
});
router.get("/db/sample", function (req, res) {
  try {
    students.map((student) => {
      db.Students.create(student);
    });
    groups.map((group) => {
      db.Groups.create(group);
    });
    notes.map((note) => {
      db.Notes.create(note);
    });
    members.map((member) => {
      db.GroupMembers.create(member);
    });

    res.status(201).send("Database tables created.");
  } catch (error) {
    res.status(500).send("Database tables not created.");
    console.log(error);
  }
});
router.get("/db/creation", async function (req, res) {
  try {
    await db.sequelize.sync({ force: true });
    subjects.map((subject) => {
      db.Subjects.create(subject);
    });

    res.status(201).send("Database tables created.");
  } catch (error) {
    res.status(500).send("Database tables not created.");
    console.log(error);
  }
});

router.post("/db/create_student", async function (req, res) {
  try {
    await db.Students.create({
      id: req.body.id,
      email: req.body.email,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send("Student not added.");
  }
});

// TODO: remove these
router.get("/db/findnote/:id", NotesController.findOne);

router.post("/db/createnote", NotesController.create);

router.delete("/db/delete/:id", NotesController.delete);

router.put("/db/put/:id", NotesController.put);

router.get("/db/findAll", NotesController.findAll);

module.exports = router;
