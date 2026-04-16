const http = require('http');
const server = http.createServer((req,res) =>{
    if(req.url === "/"){
        res.end('hello This is home page');
    }
    else if(req.url === "/about"){
        res.end('hello this is about page');
    }
    else if(req.url === "/content"){
        res.end('hello this is content page');
    }
    else if(req.url === "/detail"){
        res.end('This is my datial page')
    }
    else{
        res.end('this is my error page');
    }
});
server.listen(8000,()=>{
    console.log("server is running at address http://localhost:8000");
})