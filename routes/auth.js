const router = require("express").Router();
const userController = require("../controllers/user.controller");

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

module.exports = router;
