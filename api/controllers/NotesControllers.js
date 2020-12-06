const { report } = require('../app');
var db = require('../models/database');

 module.exports.findOne = (req, res) => {
     db.Notes.findOne({
         order: [
            ['id']
         ]
     }).then(
         (result) => {
             if(result){
                 res.status(200).send(result)
             }
             else{
                 res.status(404).send()
             }
         }
     )
 }




 module.exports.createNote = async(req, res) =>{
     try{
         let note = await db.Notes.create({
            title: req.body.title, 
            tags: "",
            keywords: ""

         })

         res.status(201).send(note)

     }
     catch(ex){
        console.log(ex)
        res.status(500).send('server error')
     }
 }



 //TO-DO
 //n



