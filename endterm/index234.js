const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const opction={
    maxAge:
    24 * 60 * 60 * 1000,
    httpOnly:true,
    secure:true,
    signed:true
}
app.get("/setcookie", (req, res) => {
  res.cookie("username", "john_doe",opction); 
  res.cookie("age ", "24", opction);
  res.cookie("city", "mathura", opction);

  res.send("Cookie has been set successfully");
});

app.get("/getcookie",(req, res)=>{
    res.send(req.cookies);
})

app.get("/deletecookie",(req, res)=>{
    res.clearCookie("username");
    res.clearCookie("age");
    res.clearCookie("city");
    res.send("Cookie deleted successfully");
})
app.listen(5000);
