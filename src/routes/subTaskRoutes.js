const express = require("express");
const { registerUser, loginUser } = require("../controllers/subTaskController");
const router = express.Router();

router.get("/", registerUser);
router.post("/", loginUser);

module.exports = router;
