const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myDB9");
    console.log("DB connected successfully ✅ ");
  } catch (error) {
    console.log("DB connection error", error);
    process.exit(1);
  }
}
connectDB();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
});

const User = mongoose.model("User", userSchema);
app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.send("user already exists ❌");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
    });

    await user.save();
    res.send("signUp successful ✅");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("user does not exist ❌");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("please enter correct password ❌");
    }

    const token = jwt.sign({ id: user._id }, "mySecretKey", {
      expiresIn: "1h",
    });

    res.json({ message: "login successful ✅", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.send("token not found ❌");
    }

    const decoded = jwt.verify(token, "mySecretKey");

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.send("invalid token ❌");
  }
} 

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});