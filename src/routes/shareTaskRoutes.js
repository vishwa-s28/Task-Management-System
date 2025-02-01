const express = require("express");
const { shareTask, getSharedUsers } = require("../controllers/shareTastController");
const router = express.Router();

router.get("/:taskId", getSharedUsers);
router.post("/:taskId", shareTask);

module.exports = router;
