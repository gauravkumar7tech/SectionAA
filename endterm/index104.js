const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
async function connectDB(){
    try{
     await mongoose.connect("mongodb://localhost:27017/db1");
     console.log("DB connected  successfully ");
    }
    catch(error){
        console.log("conenction error:",error);
        process.exit(1);
    }
}
connectDB()
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    email:String
});
const User=mongoose.model("User",userSchema);
app.post("/users",async(req,res)=>{
    const user=await User.create(req.body);
    res.json(user); 
})

app.get("/user", async(req,res)=>{
    const user=await User.find({});
    res.json(user);
})

app.get("/user/:id",async(req, res)=>{
    const user=await User.findById(req.params.id);
    res.json(user);
})

app.put("/user/:id", async(req, res)=>{
    const user=await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json(user);
});

app.delete("/user/:id", async(req, res)=>{
    const user=await User.findByIdAndDelete(req.params.id);
    res.json(user);
})

app.get("/filter-user", async(req, res)=>{
    const user=await User.find({age:{$gte:25}});
    res.json(user);
})

app.listen(3000);