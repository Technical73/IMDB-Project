const express = require("express");
const router = express.Router();
const {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getDetailsById,
} = require("../controllers/movieControllers");
const authValidate = require("../middlewares/authMiddlewares");

router.post("/movies", authValidate, createMovie);

router.get("/movies", authValidate, getMovies);

router.get("/movies/:id", authValidate, getDetailsById);

router.put("/movies/:id", authValidate, updateMovie);

router.delete("/movies/:id", authValidate, deleteMovie);

module.exports = router;
