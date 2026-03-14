const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.get("this is my home page in my first code");
});

app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
})

