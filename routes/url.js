const express = require("express");
const {
  handleGenerateNewShortURL,
  HandleGetAnalytics,
} = require("../controlers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", HandleGetAnalytics);

module.exports = router;
