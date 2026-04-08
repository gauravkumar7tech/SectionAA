const express =require("express");
const app=express();
const mongoose=require("mongoose"); 
// const Schema=mongoose.Schema;
app.use(express.json());
async function connectDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Connected to DB");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
connectDB();

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})

const User =mongoose.model("users",userSchema);
app.post("/user",async (req,res)=>{

    try{
        const user= new User(req.body);
        await user.save();
        res.status(201).send(user);

    }catch(error){
        res.status(400).send(error);
    }
})
app.listen(3000);

