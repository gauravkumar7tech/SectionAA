const http = require("http");
const server = http.createServer((req, res) => {
  res.end("hello from the other side");
});

server.listen(8000, () => {
  console.log("server is running on port http://localhost:8000");
})