const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email_id: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
