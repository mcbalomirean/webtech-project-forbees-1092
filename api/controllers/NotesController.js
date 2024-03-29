var db = require("../models/database");

// GET /notes/:id
module.exports.findOne = async (req, res) => {
  try {
    let result = await db.Notes.findByPk(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Note not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

// get content, separately from the rest of the attributes for optimization reasons
// GET /notes/:id/contents
module.exports.getContents = async (req, res) => {
  try {
    let result = await db.Notes.findByPk(req.params.id, {
      attributes: ["contents"],
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Content not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

// for reasons of optimization, we excluded the contents from the findAll method in order to give access to this only on request
// GET /notes/
module.exports.findAll = async (req, res) => {
  try {
    let result = await db.Notes.findAll({
      where: { studentId: req.user.id },
      attributes: { exclude: ["contents"] },
    });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No notes found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

// POST /notes
module.exports.create = async (req, res) => {
  try {
    let result = await db.Notes.create({
      title: req.body.title,
      contents: req.body.contents,
      tags: req.body.tags,
      keywords: req.body.keywords,
      studentId: req.user.id,
      subjectName: req.body.subject,
    });
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

// soft-deletion
// DELETE /notes/:id
module.exports.delete = async (req, res) => {
  try {
    let result = await db.Notes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

// PUT /notes/:id
module.exports.put = async (req, res) => {
  db.Notes.findByPk(req.params.id)
    .then((message) => {
      if (message) {
        message
          .update(req.body)
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("db error");
          });
      } else {
        res.status(404).send("res not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("db error");
    });
};

module.exports.shareNoteWithStudent = async (req, res) => {
  try {
    let student = await db.Students.findOne({
      where: { email: req.params.email },
    });
    let note = await db.Notes.findByPk(req.params.id);
    await student.createNote({
      title: note.title,
      contents: note.contents,
      tags: note.tags,
      keywords: note.keywords,
      studentId: student.id,
      subjectName: note.subjectName,
    });

    res.status(200).send("Shared.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

module.exports.shareNoteWithGroup = async (req, res) => {
  try {
    let group = await db.Groups.findOne({
      where: { name: req.params.name },
    });
    let note = await db.Notes.findByPk(req.params.id);
    let students = await group.getStudents();

    students.forEach((student) => {
      student.createNote({
        title: note.title,
        contents: note.contents,
        tags: note.tags,
        keywords: note.keywords,
        studentId: student.id,
        subjectName: note.subjectName,
      });
    });

    res.status(200).send("Shared.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};
