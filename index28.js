function orderfood(){
    return new Promise((resolve,reject)=>{
        let open = false;
        setTimeout(()=>{
            if(open){
                resolve("you will get your food soon");
            }else{
                reject("sorry we are closed")
            }
        },3000);
    })
}

orderfood().then
((message)=>{
    console.log(message);
}).catch((error)=>{
    console.log(error);
})
