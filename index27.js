const mypromise = new Promise((resolve,reject)=>{
    let success = false;;
    setTimeout(()=>{
        if(success){
            resolve("promise resolve successfully");
        }else{
            reject("promise rejected");
        }
    }, 2000);
    
});

mypromise.then((message)=>{
    console.log(message);
}).catch((error)=>{
    console.log("this is the error I am getting "+error);
});