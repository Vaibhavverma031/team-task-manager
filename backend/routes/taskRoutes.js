const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    createTask,
    getTasks,
    updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTaskStatus);

module.exports = router;