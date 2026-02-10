const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.get("/",(req, res)=>{
    res.render("hame",{title:"home page"});
});

app.listen(3000,()=>{
    console.log("server is at running at address https://localhost:3000");
})