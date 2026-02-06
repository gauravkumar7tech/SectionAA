const express = require("express");

const app = express();

function checkmark(req, res, next){
    const mark = parseInt(req.query.mark);
    if(mark >= 30){
        next();
    }else{
        res.send("you are failed");
    }
}

app.get('/result', checkmark,(req,res)=>{
    res.send(`student has been passed with mark ${req}`);
});


app.listen(3000);
