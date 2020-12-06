var db = require('../models/Database');

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


//TO TEST!!
module.exports.findGroupMembers = async (req, res) => {
    let group = await db.Groups.findByPk(req.params.id)
    if(group) {
        let group_members = await group.getStudents()
        res.status(200).json(group_members)
    }
    res.status(404).send()
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

