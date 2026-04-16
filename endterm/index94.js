const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
async function connectDB(){
    try{
     await mongoose.connect("mongodb://localhost:27017/myDatabade2");
     console.log("DB connected  successfully ");
    }
    catch(error){
        console.log("conenction error:",error);
        process.exit(1);
        

    }
}
connectDB()
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String
});
const User=mongoose.model("User",userSchema);
app.post("/users",async(req,res)=>{
    const user=await User.create(req.body);
    res.json(user);

    
})
app.listen(3000);