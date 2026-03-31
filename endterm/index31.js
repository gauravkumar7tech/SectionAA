const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
app.use(express.json());
app.post("/login",(req,res)=>{
    const user = {
      name: "vinay",
      city: "kota",
      coaching: "Resonance",
    };
    const token=jwt.sign(user,"mySecretKey");
    res.json({token});
})
function auth(req,res,next){
    const token=req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send("token missing");
    }
    try {
        const decoded = jwt.verify(token, "mySecretKey");
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("token invalid");
    }
}

app.get("/dashboard", auth, (req, res) => {
    res.send(`Hello I am ${req.user.name} from ${req.user.city} and I am studying in ${req.user.coaching}`);
});

app.listen(3000);
