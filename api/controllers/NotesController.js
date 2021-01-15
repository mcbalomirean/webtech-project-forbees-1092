var db = require("../models/Database");

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

module.exports.findAll = async (req, res) => {
  try {
    let result = await db.Notes.findAll();

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
