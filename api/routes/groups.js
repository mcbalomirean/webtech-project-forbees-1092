const express = require('express')
const router = express.Router()
const GroupsController = require('../controllers/GroupsController')

router.get('/', GroupsController.findAll)
router.get('/:id', GroupsController.findOne)
// router.get('/:id/groupMembers', GroupsController.findGroupMembers) // TODO: doesn't exist in the controller, throws error!

router.post('/', GroupsController.create)


module.exports = router;