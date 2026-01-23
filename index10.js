const fs=require("fs");
fs.unlink("first.txt",(err)=>{
    if(err){
        console.log("err");
        return;
    }
        console.log("file has been deleted succesfullty");
})