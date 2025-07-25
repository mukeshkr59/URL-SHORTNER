const { nanoid } = require("nanoid");
const URL = require("../models/url");

// console.log("Request body:", req.body);

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  // if (!body.url) {
  //   // return res.status(400).json({ error: "URL is required" });
  //   return res.render("home", {
  //     err : body.url
  //   })
  // }
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy : req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });

  // return res.json({ id : shortID })
}

async function HandleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  HandleGetAnalytics,
};
