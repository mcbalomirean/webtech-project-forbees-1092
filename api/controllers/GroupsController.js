var db = require("../models/Database");
const Groups = require("../models/Groups");

module.exports.findAll = (req, res) => {
  db.Groups.findAll({
    include: [
      {
        model: db.Students,
      },
    ],
    where: {
      owner: req.user.email,
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

module.exports.findOne = (req, res) => {
  db.Groups.findByPk(req.params.id).then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send();
    }
  });
};

module.exports.create = async (req, res) => {
  try {
    let group = await db.Groups.create({
      name: req.body.name,
      owner: req.user.email,
    });
    let student = await db.Students.findByPk(req.user.id);
    group.addStudent(student);
    res.status(201).send(group);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports.delete = async (req, res) => {
  try {
    let result = await db.Groups.destroy({
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

//TO DO
// module.exports.add = async (req, res) => {
//   try {
//     let student = await db.Students.findByPk(req.body.studentId);
//     let group = await db.Groups.findByPk(req.body.groupId);
//     await group.addStudent(student);
//     await student.addGroup(group);

//     res.status(201).send(student);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

module.exports.add = async (req, res) => {
  try {
    let student = await db.Students.findOne({
      where: { email: req.body.email },
    });
    let group = await db.Groups.findByPk(req.body.groupId);
    await group.addStudent(student);
    await student.addGroup(group);

    res.status(201).send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// module.exports.remove = async (req, res) => {
//   try {
//     let student = await db.Students.findOne({
//       where: { email: req.body.email },
//     });
//     let group = await db.Groups.findByPk(req.body.groupId);
//     await student.removeGroup(group);
//     await group.removeStudent(student);

//     res.status(201).send(student);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

// module.exports.remove = async (req, res) => {
//   try {
//     let student = await db.Students.findOne({
//       where: { email: req.body.email },
//     });
//     let result = await db.GroupMembers.destroy({
//       where: {
//         studentId: student.id,
//       },
//     });
//     res.status(200).send("deleted");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error.");
//   }
// };

module.exports.remove = async (req, res) => {
  try {
    let student = await db.Students.findOne({
      where: { email: req.params.email },
    });
    let result = await db.GroupMembers.destroy({
      where: {
        studentId: student.id,
        groupId: req.body.groupId,
      },
    });
    res.status(200).send("deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error.");
  }
};
