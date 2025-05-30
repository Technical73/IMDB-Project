import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosConfig";

export const fetchProducers = createAsyncThunk(
  "producers/fetchProducers",
  async () => {
    const response = await api.get("/producers");
    return response.data.data;
  }
);

export const createProducer = createAsyncThunk(
  "producers/createProducer",
  async (producerData, thunkAPI) => {
    try {
      const response = await api.post("/producers", producerData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create actor"
      );
    }
  }
);

const producerSlice = createSlice({
  name: "producers",
  initialState: {
    producers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProducer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.loading = false;
        state.producers.push(action.payload);
      })
      .addCase(createProducer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default producerSlice.reducer;
