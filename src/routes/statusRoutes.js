const express = require("express");
const { addStatus, getAllStatus, updateStatus, deleteStatus } = require("../controllers/statusController");
const router = express.Router();

router.get("/", getAllStatus);
router.post("/", addStatus);
router.put("/:statusId", updateStatus);
router.delete("/:statusId", deleteStatus);

module.exports = router;
