const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Protected Route Accessed",
        user: req.user
    });
});
module.exports = router;