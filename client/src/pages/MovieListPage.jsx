import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie, fetchMovies } from "../../src/Redux/movieSlice";
import MovieCard from "../components/MovieCard";
import { MovieForm } from "../components/MovieForm";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddActorModal } from "../components/AddActorModal";
import { AddProducerModal } from "../components/AddProducerModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { logoutUser } from "../Redux/authSlice";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "start",
  boxShadow: "none",
  border: "none",
  backgroundColor: "transparent",
}));

const MovieListPage = () => {
  const dispatch = useDispatch();
  const {
    list: movies,
    moviesLoading,
    error,
  } = useSelector((state) => state.movies);
  const [open, setOpen] = useState(false);
  const [actorOpen, setActorOpen] = useState(false);
  const [producerOpen, setProducerOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    let delayDebounce;

    if (searchTerm) {
      delayDebounce = setTimeout(() => {
        dispatch(fetchMovies(searchTerm.trim()));
      }, 500);
    } else {
      dispatch(fetchMovies());
    }

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const onEdit = (data) => {
    setSelectedMovie(data);
    setOpen(true);
  };

  const handleDeleteMovie = async (movie) => {
    const result = await dispatch(deleteMovie(movie._id));
    if (deleteMovie.fulfilled.match(result)) {
      dispatch(fetchMovies());
      toast.success("Movie deleted successfully!");
    } else {
      toast.error(result.payload || "Failed to delete movie");
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast.success(result.payload || "Logout successfully!");
      navigate("/login");
    } else {
      toast.error(error.payload || "Logout failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#0a000f",
        color: "#fff",
      }}
    >
      <Header
        setOpen={setOpen}
        setActorOpen={setActorOpen}
        setProducerOpen={setProducerOpen}
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {error && (
        <>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color="white"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              {error}
            </Typography>
          </Stack>
        </>
      )}
      {movies.length === 0 && searchTerm.length === 0 && !error && (
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            textAlign="center"
            sx={{ mt: 4 }}
          >
            No movies available at the moment. Please add new movies to get
            started.
          </Typography>
        </Stack>
      )}

      {moviesLoading ? (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1300,
            }}
          >
            <CircularProgress size={70} color="primary" />
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={2} sx={{ p: 3 }}>
            {movies.length === 0 && searchTerm.length !== 0 ? (
              <>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="white"
                    textAlign="center"
                    sx={{ mt: 4 }}
                  >
                    {`No movies found ${searchTerm}`}.
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                {movies.map((movie) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie._id}>
                    <Item>
                      {" "}
                      <MovieCard
                        movie={movie}
                        onEdit={onEdit}
                        handleDeleteMovie={handleDeleteMovie}
                      />
                    </Item>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </>
      )}

      <MovieForm
        open={open}
        handleClose={() => setOpen(false)}
        selectedMovie={selectedMovie}
      />
      <AddActorModal
        actorOpen={actorOpen}
        handleClose={() => setActorOpen(false)}
      />
      <AddProducerModal
        producerOpen={producerOpen}
        handleClose={() => setProducerOpen(false)}
      />
    </Box>
  );
};

export default MovieListPage;
