import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";

const MovieCard = ({ movie, onEdit, handleDeleteMovie }) => {
  return (
    <Card elevation={3} sx={{ bgcolor: "#1e1e1e", color: "#fff" }}>
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": {
              transform: "scale(1.1)",
              cursor: "pointer",
            },
          }}
          image={
            movie.poster_url ||
            "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.name}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {movie.name} ({movie.year_of_release})
        </Typography>
        <Typography variant="body2">
          <strong>Producer:</strong> {movie.producer?.name || "N/A"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Actors:</strong>{" "}
          {movie.actors?.map((a) => a.name).join(", ") || "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>Plot:</strong> {movie.plot || "N/A"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1, color: "white", borderColor: "white" }}
            onClick={() => onEdit && onEdit(movie)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteMovie(movie)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
