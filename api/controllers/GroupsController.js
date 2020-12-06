var db = require('../models/Database');
const Groups = require('../models/Groups');

module.exports.findAll = (req, res) => {
    db.Groups.findAll({
        include: [{
          model: db.Students
        }]
      }).then(
           (results) => {
               res.status(200).send({
                   status: "success",
                   results: results
               });
           }
       ).catch(() => {
           res.status(500).send({
               status: "error"
           })
       })
};

module.exports.findOne = (req, res) => {
    db.Groups.findByPk(req.params.id).then(
        (result) => {
            if(result) {
                res.status(200).send(result)
            } else {
                res.status(404).send()
            }
        }
    )
}

module.exports.create = async (req, res) => {
    try {

        let group = await db.Groups.create({

            name: req.body.name

        })
        res.status(201).send(group)
    } catch(error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}


module.exports.delete = async (req, res) => {
    try{
        let result = await db.Groups.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).send("deleted");
    }catch(error){
        console.log(error);
        res.status(500).send('Server error.');
    }
}


module.exports.findGroupMembers = async (req, res) => {
    let group = await db.Groups.findByPk(req.params.id)
    if(group) {
        //the getter??
        //can't test yet
        let group_members = await group.getGroupMembers();
        res.status(200).send(group_members)
        // or .json??
    }
    res.status(404).send()
}

//TO DO
module.exports.addMember = async(req, res) => {

    try{

        let student = await db.Students.findByPk(req.params.studentId)
        let group = await db.Groups.A
        //let group = await db.Groups.findByPk(req.params.id)
       // group.addStudent(student)
        res.status(201).send(group)

    } catch(error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}

