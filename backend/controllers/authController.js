const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const newUser = await User.create({ userName, email, password });
        console.log("User signed up successfully", newUser);
        
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully!", 
            user: newUser 
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({ 
            success: false, 
            error: error.message || "Error while registering new user" 
        });
    }
};

exports.logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(400).json({ message: "You forgot your registered mail id. Didn't you?!" });
        }

        const matchPassword =  await bcrypt.compare(password, user.password);

        if(!matchPassword) {
            return res.status(400).json({ message: "Please try to remember your password..." });
        }

        const userDetails = {
            id: user._id,
            email: user.email,
            username: user.userName
        };

        return res.status(200).json({ message: "Logged In successfully!", userDetails });

    } catch (error) {
        console.log(error);
        
        res.status(400).json({error: "Error while logging in the user"});
    }
}

// Google OAuth Login
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth Callback
exports.googleCallback = passport.authenticate("google", { failureRedirect: "/" });

// Logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};