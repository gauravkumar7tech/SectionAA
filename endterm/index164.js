const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortid = require("shortid");

app.use(express.json());


async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myDB5");
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.log("error:", error);
    process.exit(1);
  }
}
connectDB();


const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true, 
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Url = mongoose.model("Url", urlSchema);


app.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

 
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: "Please enter valid URL" });
    }

  
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.status(200).json({
        shortUrl: `http://localhost:3000/${existing.shortId}`,
      });
    }

    const shortId = shortid.generate();

    const url = new Url({
      originalUrl,
      shortId,
    });

    await url.save();

    res.status(201).json({
      shortUrl: `http://localhost:3000/${shortId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

   
    url.clicks++;
    await url.save();


    res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 ");
});