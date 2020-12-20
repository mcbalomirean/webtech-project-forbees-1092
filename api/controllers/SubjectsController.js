const { resource } = require("../app");
var db = require("../models/Database");

module.exports.findAll = async (req, res) => {
  try {
    let results = await db.Subjects.findAll();
    res.status(200).send(results);
  } catch (error) {
    //TODO: change so we don't expose error code
    res.status(500).send(error);
  }
};

module.exports.findAllNames = async (req, res) => {
  try {
    let results = await db.Subjects.findAll({ attributes: ["name"] });
    res.status(200).send(results);
  } catch (error) {
    //TODO: change so we don't expose error code
    res.status(500).send(error);
  }
};
