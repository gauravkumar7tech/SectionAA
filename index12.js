const http = require('http');
const server = http.createServer((req,res) =>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
})
server.listen(8000,()=>{
    console.log("server is running at address http://localhost:8000");
});