const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello, World!",
  });
});
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    userId: `the id of user is ${id}`,
  });
});
app.get("/search", (req, res) => {
  const name = req.query.name;
  res.json({
    name: `my name is ${name}`,
  });
});
app.post("/users",(req,res)=>{
    const detail=req.body;
    res.json({
        name:detail.name
    })
});
app.get("/student/:name/:age",(req,res)=>{
    const name=req.params.name;
    const age=req.params.age;
    res.json({
        name:name,
        age:age
    })
});
app.get("/products",(req,res)=>{
    const category=req.query.category;
    const price=req.query.price;
    res.json({
        category:category,
        price:price
    })
});

app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    const detail=req.body;
    res.json({
        message:"message got updated",
        detail
    })
})



app.listen(3000);