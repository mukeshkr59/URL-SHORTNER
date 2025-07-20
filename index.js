require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/test", async (req, res) => {
//   const allUrl = await URL.find({});
//   return res.render("home", {
//     urls : allUrl
//   });
// });

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!entry) return res.status(404).send("URL not found");
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>
  console.log(`Server Started at: http://localhost:${PORT}`)
);
