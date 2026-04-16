const fs=require("fs");
fs.appendFile("file2.txt","this is ne file",(err)=>{
    if(err){
        console.log(err);
    }
    console.log("file hes been appended successfully");
})
