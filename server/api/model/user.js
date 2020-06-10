const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const userShchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userShchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next;
  }

  bycrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bycrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userShchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  
  return new Promise((resolve, reject) => {
    bycrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model("User", userShchema);
