const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.cookie("username", "john_doe",{
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    signed: true
  });
  res.send("You have been logged in successfully");
});

app.get("/profile", (req, res)=>{
    if(req.cookies.username){
        res.send(`Welcome ${req.cookies.username} to your profile`);
    }else{
        res.send("Please login to view your profile");
    }
});

app.get("/logout",(req, res)=>{
    res.clearCookie("username");
    res.send("You have been logged out successfully");
});

app.listen(5000);