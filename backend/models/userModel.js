const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "kindly add a name"],
    },
    email: {
      type: String,
      required: [true, "kindly add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "kindly add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
