const express = require("express");

const app = express();

app.use(express.json());
const users =[
    {
        id:1,
        name:"vijay",
        city:"nodia",
    },
    {
        id:2,
        name:"rahul",
        city:"delhi",
    },
    {
        id:3,
        name:"shyam",
        city:"meerut",  
    }
];

app.get("/",(req,res)=>{
    res.json(users);
});

app.get("/api/users/:id",(req, res)=>{
    const id = req.params.id;
    const user = users.find(user=> user.id === id);
    if(!user){ 
        return res.status(404).json({error:"user not found"})
    }
    return res.json(user);
})

app.post("/api/users",(req, res)=>{
    const newUser = {
        id:users.length + 1,
        ...req.body
    };
    users.push(newUser);
    return res.json(users);
})

app.patch("/api/users/:id",(req, res)=>{
    const id = req.params.id;
    const user = users.find(user=> user.id === id);
    if(!user){
        return res.status(404).json({error:"user not found"})
    }
    Object.assign(user,req.body);
    return res.json(user);
})

app.delete("/api/users/:id",(req, res)=>{
    const id = req.params.id;
    const userIndex = users.findIndex(user=> user.id === id);
    if(userIndex === -1){
        return res.status(404).json({error:"user not found"})
    }
    users.splice(userIndex, 1);
    return res.json(users);
});

app.listen(3000);

