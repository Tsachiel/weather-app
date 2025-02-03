import { getVariant } from "@/lib/abTest";
import { createSlice } from "@reduxjs/toolkit";

const getInitialVariant = () => {
  if (typeof window !== "undefined") {
    const savedVariant = sessionStorage.getItem("variant");
    if (savedVariant === "A" || savedVariant === "B") return savedVariant;
  }
  return getVariant() 
};

const abTestSlice = createSlice({
  name: "abTest",
  initialState: { variant: getInitialVariant() },
  reducers: {
    setVariant: (state, action) => {
      state.variant = action.payload;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("variant", action.payload); 
      }
    },
  },
});

export const { setVariant } = abTestSlice.actions;
export default abTestSlice.reducer;
