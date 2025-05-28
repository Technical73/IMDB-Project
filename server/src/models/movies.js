const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: { type: String },
  year_of_release: { type: Number},
  plot: { type: String },
  poster_url: { type: String },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});
module.exports = mongoose.model("Movie", movieSchema);
