const express= require("express");
const path = require("path");

const app = express();
app.set("View engine","ejs");

console.log(__dirname);
app.get("/",(req, res)=>{
    res.render("index", {name:"Gaurav"})
});

app.listen(3000);