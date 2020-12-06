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



//TO DO
//Student has ID and Name
//Group member has studentId and groupId
//Group has ID and name


// module.exports.createGroup = async (req, res) => {
//     try {
//         let group_member = await db.Group_members.findByPk(req.params.id)
//         let group = await db.Groups.create({
//             //idk how it should be generated
//             group_id: group_member.id,
//             name: req.body.name

//         })
//         res.status(201).send(group)
//     } catch(ex) {
//         console.log(ex)
//         res.status(500).send('Server error')
//     }
// }




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

