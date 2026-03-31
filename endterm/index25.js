const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log(req.method);
    console.leg(req.url);
    next();
})

function auth(req,res,next){
    const token = true;
    if(token  == "secret321"){
        next();
    }else{
        res.send("Unauthorized ");
    }
}


app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.get("/deshboard", auth,(req,res)=>{
    req.send()
})
app.listen(3000);
