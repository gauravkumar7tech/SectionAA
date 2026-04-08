const mongoose = require("mongoose");
async function connectDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Connected to DB");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

connectDB();
