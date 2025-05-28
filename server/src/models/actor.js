const mongoose = require("mongoose");
const actorSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String },
    dob: {
      type: Date,
      required: true,
    },
    bio: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Actor", actorSchema);
