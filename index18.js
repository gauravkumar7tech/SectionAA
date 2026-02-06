const http = require('http');
const url = require("url");
const myurl = "http://localhost:8000/about?id=10&name=macbook";

const parsedurl = url.parse(myurl,true);


console.log(parsedurl);
console.log(parsedurl.host);

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`product_id => ${parsedurl.query.id}`);
    res.write("<br>");
    res.write(` product_name => ${parsedurl.query.name}`);
    res.end();
    });

server.listen(8000,()=>{
    console.log('server is running at address http://localhost:8000');
})

