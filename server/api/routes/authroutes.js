const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const route = express.Router();

const User = mongoose.model("User");

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User({ email, password });
    const token = jwt.sign({ userId: user._id }, 'MyKey');
    await user.save();
    res.send({ token });
  } catch (err) {
    return res.status(402).send(err.message);
  }
});
route.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Please enter email and password" });
  }
  const user = await User.findOne({email});
  if (!user) {
    return res.status(404).send({ error: "EMAIL NOT FOUND" });
  }
  
  
  try{
    await user.comparePassword(password)
    
    const token = jwt.sign({userId : user._id} , 'MyKey')
    res.send({token})
  }catch(err){
    return res.status(422).send({error : "email or password not found"})
  }

});
module.exports = route;
