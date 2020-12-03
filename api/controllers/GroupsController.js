var db = require('../models/database');
//don't have it yet
//??



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



