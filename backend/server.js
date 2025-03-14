const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app =  express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connection Successfull !"))
    .catch(err => console.error("Error Connecting to MongoDB", err));


//Server endpoint
app.get("/", (req, res) => {
    res.json({message: "Welcome to Social Media Dashboard !"});
});

//Routers
app.use("/api/auth/", authRoutes);


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
});