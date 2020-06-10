const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

module.exports = (req, res , next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "user must log in" });
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "MyKey", async (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "user must be login" });
    }

    const { userId } = decoded;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
