const express=require("express");

const app=express();

app.use((req,res,next)=>{
    console.log(`requested URL: ${req.url}`);
    console.log("this middleware will run for every request ✅");
    next();
});
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get("/",(req,res)=>{ 
   res.send("this is my home page ");
});

app.get("/about",(req,res)=>{
    res.send("this is my about page");
})

app.get("/contact",(req,res)=>{
    res.send("this is my about page");
})

app.use("/admin",(req,res,next)=>{
    console.log("admin area accessed ✅");
    next();
});

app.get("/admin/dashboard",(req,res)=>{
    res.send(`this is admin dashboard `);
});

app.get("/admin/page",(req,res)=>{
    res.send(`this is admin page`);
});

app.use((req,res,next)=>{
    res.status(404).send("404  error page not found");
    next();
});
app.listen(3000);