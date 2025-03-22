const express = require("express");
const router = express.Router();
const { signUp, logIn, googleAuth, googleCallback, logout, getUser, } = require("../controllers/authController");
const { signupMiddleware, loginMiddleware} = require("../middleWare/authMiddleWare");

router.post("/sign-up", signupMiddleware, signUp);
router.post("/log-in", loginMiddleware, logIn);

// Google OAuth Routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, (req, res) => {
  res.json(req.user);
//   res.redirect("http://localhost:3000/dashboard");
});

// Logout
router.get("/logout", logout);
router.get("/user", getUser);

module.exports = router;