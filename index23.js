const express=require("express");
const app=express();

app.set("view engine","ejs");

app.set("views",__dirname);

app.get("/",(req,res)=>{
    res.render("index",{
        name:"Vijay",
        tech:"Node.js",
        skills:["HTML","CSS","JavaScript","Node.js","Express.js"]
    });
});
// skills.forEach(skill=>{
//     console.log(skill);
// });

app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000`);
});
