const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/setcookie", (req, res) => {
  res.cookie("username", "john_doe",{
    maxAge: 24 * 60 * 60 * 1000,
  });
    res.send("Cookie has been set successfully");
});

app.get("/getcookie",(req, res)=>{
    res.send(req.cookies);
})

app.get("/deletecookie",(req, res)=>{
    res.clearCookie("username");
    res.send("Cookie deleted successfully");
})
app.listen(5000);
