// creatin the folder 
// const fs=require("fs");
// fs.mkdir("Backend", (err) =>{
//     if(err){
//         console.log("error in creating folder", err);
//     }
//     console.log("folder created successfully");
// })


// delete the folder code 
// const fs=require("fs");
// fs.rmdir("gaurav", (err) =>{
//     if(err){
//         console.log("error in delete folder", err);
//     }
//     console.log("folder has been deleted successfully");
// })


// renmane the file 
// const fs=require("fs");
// fs.rename("filr.txt","file50.txt", (err) =>{
//     if(err){
//         console.log(err);
//     }
//     console.log("folder has been deleted successfully");
// })


const fs=require("fs");
fs.readdir("./", (err, files) =>{
    if(err){
        console.log(err);
    }
    console.log("folder has been deleted successfully");
    console.log(files);
})