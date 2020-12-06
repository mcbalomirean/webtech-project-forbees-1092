var db = require('../models/Database');

// GET /notes/:id
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

module.exports.findAll = async (req, res) => {
    
    try{
    let result = await db.Notes.findAll();

    if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Note not found.');
      }
    }catch (error) {
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

// soft-deletion
// DELETE /notes/:id
module.exports.delete = async (req, res) => {
    try{
        let result = await db.Notes.destroy({
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

// PUT /notes/:id
// module.exports.put = async (req, res) => {
//     try{
//         const newTitle = req.body.title;
//         const newTags = req.body.tags;
//         const newKeywords = req.body.keywords;
//         const idd = req.body.keywords;
            
//         const result = await db.Notes.update({
//             title: newTitle,
//             tags: newTags,
//             keywords: newKeywords
//             },
//             { where: {id:idd} }
//             )
//             handleResult(result)
//             } catch(err){
//             handleError(err)
//             res.status(500).send('Server error.');
//         }
    
        
//         await db.Notes.save();


//         if(result){
//             res.status(200).send("Updated successfully"); // 200 OK
//         }
//         else{
//             res.status(204).send("Could not update"); // 204 No Content
//         }
     
        
//     }