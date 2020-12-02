const express = require('express')

const router = express.Router()


const GroupsController = require('../controllers/GroupsController.js')

router.get('/', GroupsController.findAll)
router.get('/:id', GroupsController.findOne)
router.get('/:id/groupMembers', GroupsController.findGroupMembers)


module.exports = router