import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosConfig";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm = "", thunkAPI) => {
    try {
      const response = await api.get(
        `http://localhost:8000/api/movies?search=${encodeURIComponent(
          searchTerm
        )}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch movies"
      );
    }
  }
);

export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (movieData, thunkAPI) => {
    try {
      const response = await api.post(
        "http://localhost:8000/api/movies",
        movieData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create movie"
      );
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(
        `http://localhost:8000/api/movies/${id}`,
        updatedData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update movie"
      );
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, thunkAPI) => {
    try {
      await api.delete(`http://localhost:8000/api/movies/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete movie"
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    moviesLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.moviesLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(createMovie.pending, (state) => {
        state.moviesLoading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.moviesLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMovie.pending, (state) => {
        state.moviesLoading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.moviesLoading = false;
        const index = state.list.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.moviesLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.moviesLoading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.list = state.list.filter((movie) => movie._id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.moviesLoading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
