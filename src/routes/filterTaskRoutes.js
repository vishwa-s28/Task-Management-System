const express = require("express");
const { filterTaskByStatus, filterTaskByDueDate, filterTasksAssignedToUser, filterTasksBySharedStatus } = require("../controllers/filterTaskController");
const router = express.Router();

router.get("/status", filterTaskByStatus);
router.get("/duaDate", filterTaskByDueDate);
router.get("/assignee", filterTasksAssignedToUser);
router.get("/shared", filterTasksBySharedStatus);

module.exports = router;
