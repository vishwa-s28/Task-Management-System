const express = require("express");
const { createBulkTasks, assignTasksToUser, deleteBulkTask } = require("../controllers/bulkTaskController");

const router = express.Router();

router.post("/create", createBulkTasks);
router.post("/assign/:userId", assignTasksToUser);
router.delete("/delete", deleteBulkTask);

module.exports = router;
