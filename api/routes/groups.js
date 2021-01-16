const express = require("express");
const router = express.Router();
const GroupsController = require("../controllers/GroupsController");

router.get("/", GroupsController.findAll);
router.get("/:id", GroupsController.findOne);
router.get("/members/:id", GroupsController.findGroupMembers);
// router.get('/:id/groupMembers', GroupsController.findGroupMembers) // TODO: doesn't exist in the controller, throws error!

router.post("/create", GroupsController.create);
router.post("/add/", GroupsController.add);
router.delete("/:id", GroupsController.delete);
router.delete("/remove/:email", GroupsController.remove);

module.exports = router;
