import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import movieReducer from "../Redux/movieSlice";
import producerReducer from "../Redux/producerSlice";
import actorReducer from "../Redux/actorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    producers: producerReducer,
    actors: actorReducer,
  },
});
