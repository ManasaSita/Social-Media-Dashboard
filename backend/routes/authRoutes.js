const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/authController");
const { signupMiddleware, loginMiddleware} = require("../middleWare/authMiddleWare");

router.post("/sign-up", signupMiddleware, signUp);
router.post("/log-in", loginMiddleware, logIn);

module.exports = router; 