const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) =>{
    const log =`${Date.now()}:${req.url}new request arecived\n`;
    fs.appendFile('file4.txt', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Data has been append successfully');
    });
    res.end('This is my first server  with fs and http');

});
server.listen(8000,()=>{
    console.log("server is running at address http://localhost:8000");
})