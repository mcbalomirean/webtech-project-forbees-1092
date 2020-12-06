var db = require('../models/Database');

module.exports.findOne = async (req, res) => {
  try {
    let result = await db.Notes.findByPk(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Note not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error.');
  }
}

module.exports.create = async (req, res) => {
  try {
    let result = await db.Notes.create({
      title: req.body.title,
      tags: req.body.tags,
      keywords: req.body.keywords,
      studentId: req.body.studentId,
      subjectName: req.body.subjectName
    });
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error.');
  }
}