import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blogsApi";
import { authApi } from "./services/authApi";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware),
});
