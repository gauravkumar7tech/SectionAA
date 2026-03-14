const express = require("express");
import * as res from 'express/lib/response';
const app = express();
app.get("/", (req, res)=>{
    res.json({"name":"vijay","age":20})
})

app.get("user/:id",(req, res)=>{
    const id = req.params.id;
    res.json({"userid":id});
    
})

app.get("/search",(req,res)=>{
    const name  = req.query.name;
    res.json({"search name":name});
})

app.post("/user",(req,re)=>{
    const name  = req.body.name;
    res.json({
        message:`my name is ${name}`,
    });
})

app.listen(3000);