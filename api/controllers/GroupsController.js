var db = require("../models/database");

//find all the groups a student is in
module.exports.findAll = async (req, res) => {
  try {
    let student = await db.Students.findByPk(req.user.id);
    let groups = await student.getGroups();

    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

//finds a group by id
module.exports.findOne = (req, res) => {
  db.Groups.findByPk(req.params.id).then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send();
    }
  });
};

//creates a group, receives a name and adds the creator as the owner
module.exports.create = async (req, res) => {
  try {
    let group = await db.Groups.create({
      name: req.body.name,
      ownerId: req.user.id,
    });
    let student = await db.Students.findByPk(req.user.id);
    group.addStudent(student);
    res.status(201).send(group);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

//deletes a group by id
module.exports.delete = async (req, res) => {
  try {
    let group = await db.Groups.findByPk(req.params.id);
    if (req.user.id == group.ownerId) {
      let result = await db.Groups.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("deleted");
    } else res.status(511).send("You need to log in!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};

//finds all the groups' members by its id
module.exports.findGroupMembers = async (req, res) => {
  db.Groups.findOne({
    include: [
      {
        model: db.Students,
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(() => {
      res.status(500).send({
        status: "error",
      });
    });
};

//Adds a student to a group, by their email
module.exports.add = async (req, res) => {
  try {
    let student = await db.Students.findOne({
      where: { email: req.params.email },
    });
    let group = await db.Groups.findByPk(req.params.id);
    await group.addStudent(student);
    await student.addGroup(group);

    res.status(201).send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

//Removes a student from a group by their email
module.exports.remove = async (req, res) => {
  try {
    let student = await db.Students.findOne({
      where: { email: req.params.email },
    });
    let group = await db.Groups.findByPk(req.params.id);
    if (req.user.id == group.ownerId) {
      await student.removeGroup(group);

      res.status(200).send("deleted");
    } else res.status(511).send("You need to log in!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};
