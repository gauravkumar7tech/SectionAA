const express=require("express");
// import * as res from 'express/lib/response';
const app=express();

app.use((req,res,next)=>{
    console.log(`requested url: ${req.url}`);
    console.log(`middleware will run for every request`);
    next();
})
app.use("/admin",(req,res, next)=>{
    console.log (`admin area accessed`);
    next();
});

app.get('/', (req,res)=>{
    res.send(`Hello world this will run after the middleware`);
});

app.use((req,res,next)=>{
    res.status(404).send(`404 not found`);
})
app.listen(3000,()=>{
    console.log(`server is running at address http://localhost:3000`);
});