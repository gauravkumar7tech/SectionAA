const http = require('http');
const server = http.createServer((req,res) =>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    // res.end("hello from the other side");
})

server.listen(8000,()=>{
    console.log("server is running on port http://localhost:8000");
});