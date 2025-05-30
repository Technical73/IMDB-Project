import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosConfig";

export const fetchActors = createAsyncThunk("actors/fetchActors", async () => {
  const response = await api.get("/actors");
  return response.data.data;
});
export const createActor = createAsyncThunk(
  "actors/createActor",
  async (actorData, thunkAPI) => {
    try {
      const response = await api.post("/actors", actorData, {
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

const actorSlice = createSlice({
  name: "actors",
  initialState: {
    actors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.loading = false;
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createActor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActor.fulfilled, (state, action) => {
        state.loading = false;
        state.actors.push(action.payload);
      })
      .addCase(createActor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default actorSlice.reducer;
