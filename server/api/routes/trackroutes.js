const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Track = mongoose.model("Track");

route.use(requireAuth);

route.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});
module.exports = route;
