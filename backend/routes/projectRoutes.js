const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProject
);

router.get(
  "/",
  authMiddleware,
  getProjects
);

module.exports = router;