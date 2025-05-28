const Movie = require("../models/movies");

const createMovie = async (req, res) => {
  try {
    const { name, year_of_release, plot, poster_url, producer, actors } =
      req.body;

    if (
      !name ||
      !year_of_release ||
      !plot ||
      !poster_url ||
      !producer ||
      !actors?.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const producerId = producer;

    const actorIds = actors;

    const movie = await Movie.create({
      name,
      year_of_release,
      plot,
      poster_url,
      producer: producerId,
      actors: actorIds,
    });

    res.status(201).json({ message: "Movie created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMovies = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }

    const movies = await Movie.find(query)
      .populate("producer")
      .populate("actors");

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    let { id } = req.params;
    const { name, year_of_release, plot, poster_url, producer, actors } =
      req.body;

    if (
      !id ||
      !name ||
      !year_of_release ||
      !plot ||
      !poster_url ||
      !producer ||
      !Array.isArray(actors) ||
      !actors.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const producerId = producer;

    const actorIds = actors;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        name,
        year_of_release,
        plot,
        poster_url,
        producer: producerId,
        actors: actorIds,
      },
      { new: true }
    )
      .populate("producer")
      .populate("actors");

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Movie updated successfully", updatedMovie });
  } catch (error) {
    console.error("Update Movie Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id)
      .populate("producer")
      .populate("actors");

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getDetailsById,
};
