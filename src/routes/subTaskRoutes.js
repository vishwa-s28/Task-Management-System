const express = require("express");
const { getSubtasks, addSubtask } = require("../controllers/subTaskController");
const router = express.Router();

router.get("/:taskId", getSubtasks);
router.post("/:taskId", addSubtask);

module.exports = router;
