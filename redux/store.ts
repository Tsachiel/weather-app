import { configureStore } from "@reduxjs/toolkit";
import abTestReducer from "./slices/abTestSlice";

export const store = configureStore({
  reducer: {
    abTest: abTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
