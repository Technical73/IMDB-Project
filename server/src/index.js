require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes.js");
const actorRoutes = require("./routes/actorRoutes.js");
const producerRoutes = require("./routes/producerRoutes.js");
const dbConnected = require("./config/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: "https://imdb-project-2.onrender.com/",
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to DB
dbConnected();

// Routes
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", actorRoutes);
app.use("/api", producerRoutes);

// Server
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
