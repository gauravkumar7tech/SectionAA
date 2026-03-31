const express=require("express");
const app=express();
const users=require("./MOCK_DATA.json");
const fs=require("fs");
app.use(express.json());

app.get("/users",(req,res)=>{
   const html=`
   <ul>
     ${users.map(user=>`<li>${user.first_name} ${user.last_name}</li>`).join("")}
   </ul>
   `;
   return res.send(html);
});
//vikas sharma is a software developer

app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id",(req,res)=>{
    const id=req.params.id;
    const user=users.find(user=>user.id==id);
    if(!user){
        return res.status(404).json({message:"users not found"});
    }
    else{
        return res.json(user);
    }
});
app.post("/api/users",(req,res)=>{
   const newUser={
    id:users.length+1,
    ...req.body
   };
   users.push(newUser);
   fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err)=>{
    if(err){
        return res.status(500).json({message:"users can not be added"});
    }
    else{
        res.json({message:"users added successfully",user:newUser});
    }
   })
});
app.patch("/api/users/:id",(req, res)=>{
    const id=req.params.id;
    const indexuser=users.find(user=>user.id==id);
    if(indexuser == -1){
        return res.status(404).json({message:"users not found"});
    }
    users[indexuser] = {
        ...users[indexuser],
        ...req.body
    }
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({message:"users can not be updated"});
        }
        else{
            res.json({message:"users updated successfully"});
        }
       })
});

app.delete("api/users/:id",(req, res)=>{
    const id=req.params.id;
    const indexuser=users.find(user=>user.id==id);
    if(indexuser == -1){
        return res.status(404).json({message:"users not found"});
    }
    users.splice(indexuser,1);
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({message:"users can not be deleted"});
        }
        else{
            res.json({message:"users deleted successfully"});
        }
       })
})


app.listen(3000);
