let p1 = new Promise((res, rej)=>{
  let num = Math.floor(Math.random()*100);
  if(num%2 == 0){
    res("Promise 1 Resolved with even number "+num)
  }
  
  else{
    rej("Promise 1 Rejected with odd number "+num)
  }
})

.then((data)=>console.log(data))
.catch((err)=>console.log(err));
