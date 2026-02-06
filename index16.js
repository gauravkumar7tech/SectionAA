const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) =>{
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('index15.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(8000,()=>{
    console.log('server is running at address http://localhost:8000');
})