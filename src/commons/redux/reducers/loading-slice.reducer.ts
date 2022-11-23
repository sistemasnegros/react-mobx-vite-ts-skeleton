import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    start: (state) => {
      return true;
    },
    stop: (state) => {
      return false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
