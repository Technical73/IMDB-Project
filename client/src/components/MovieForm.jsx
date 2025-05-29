import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  createMovie,
  fetchMovies,
  updateMovie,
} from "../../src/Redux/movieSlice";
import { fetchProducers } from "../../src/Redux/producerSlice";
import { fetchActors } from "../../src/Redux/actorSlice";
import { toast } from "react-toastify";

export const MovieForm = ({ open, handleClose, selectedMovie }) => {
  const dispatch = useDispatch();
  const producers = useSelector((state) => state.producers.producers);
  const actors = useSelector((state) => state.actors.actors);

  const [formData, setFormData] = useState({
    name: "",
    year_of_release: "",
    plot: "",
    poster_url: "",
    producer: "",
    actors: [],
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (open) {
      dispatch(fetchProducers());
      dispatch(fetchActors());

      if (selectedMovie) {
        setFormData({
          name: selectedMovie.name || "",
          year_of_release: selectedMovie.year_of_release || "",
          plot: selectedMovie.plot || "",
          poster_url: selectedMovie.poster_url || "",
          producer: selectedMovie.producer?._id || "",
          actors: selectedMovie.actors.map((actor) => actor._id) || [],
        });
      } else {
        setFormData({
          name: "",
          year_of_release: "",
          plot: "",
          poster_url: "",
          producer: "",
          actors: [],
        });
      }
    }
  }, [dispatch, open, selectedMovie]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleActorsChange = (_, value) => {
    setFormData({ ...formData, actors: value.map((actor) => actor._id) });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Movie name is required";
    if (!String(formData.year_of_release).trim())
      errors.year_of_release = "Year of release is required";
    if (!formData.plot.trim()) errors.plot = "Plot is required";
    if (!formData.poster_url.trim())
      errors.poster_url = "Poster URL is required";
    if (!formData.producer) errors.producer = "Producer is required";
    if (!formData.actors.length)
      errors.actors = "At least one actor is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (selectedMovie) {
        const response = await dispatch(
          updateMovie({ id: selectedMovie._id, updatedData: formData })
        ).unwrap();
        toast.success(response.message || "Movie updated successfully!");
        handleClose();
        dispatch(fetchMovies());
      } else {
        const response = await dispatch(createMovie(formData)).unwrap();
        toast.success(response.message || "Movie created successfully!");
      }
      if (!selectedMovie) {
        handleClose();
        dispatch(fetchMovies());
      }
    } catch (error) {
      toast.error(error || "Failed to process movie");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">
          {" "}
          {selectedMovie ? "Edit Movie" : "Add Movie"}
        </Typography>
        <Button onClick={handleClose} sx={{ minWidth: 0, padding: 0 }}>
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent>
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                fullWidth
              />
              <TextField
                label="Year of Release"
                name="year_of_release"
                value={formData.year_of_release}
                onChange={handleChange}
                error={!!formErrors.year_of_release}
                helperText={formErrors.year_of_release}
                fullWidth
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl fullWidth error={!!formErrors.producer}>
                <InputLabel>Producer</InputLabel>
                <Select
                  name="producer"
                  value={formData.producer}
                  onChange={handleChange}
                  label="Producer"
                >
                  {producers &&
                    producers.map((producer) => (
                      <MenuItem key={producer._id} value={producer._id}>
                        {producer.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Autocomplete
                multiple
                fullWidth
                options={actors}
                getOptionLabel={(option) => option.name}
                value={
                  actors &&
                  actors.filter((actor) => formData.actors.includes(actor._id))
                }
                onChange={handleActorsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Actors"
                    error={!!formErrors.actors}
                    helperText={formErrors.actors}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Poster URL"
                name="poster_url"
                value={formData.poster_url}
                onChange={handleChange}
                error={!!formErrors.poster_url}
                helperText={formErrors.poster_url}
                fullWidth
              />
              <TextField
                label="Plot"
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                error={!!formErrors.plot}
                helperText={formErrors.plot}
                multiline
                rows={4}
                fullWidth
              />
            </Stack>

            {formErrors.submit && (
              <Typography variant="body2" color="error">
                {formErrors.submit}
              </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedMovie ? "Update" : "Submit"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};
