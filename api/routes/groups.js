const express = require("express");
const router = express.Router();
const GroupsController = require("../controllers/GroupsController");

router.get("/", GroupsController.findAll);
router.get("/:id", GroupsController.findOne);
router.get("/:id/members", GroupsController.findGroupMembers);

router.post("/", GroupsController.create);
router.post("/:id/members/:email", GroupsController.add);

router.delete("/:id", GroupsController.delete);
router.delete("/:id/members/:email", GroupsController.remove);

module.exports = router;
