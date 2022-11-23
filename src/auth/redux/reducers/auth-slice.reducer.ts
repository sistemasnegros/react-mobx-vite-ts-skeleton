import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {}, token: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      return action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
