import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserNAme(state, { payload }) {
      state.userName = payload;
    },
  },
});

export const userSlice = slice.reducer;
export const { updateUserNAme } = slice.actions;
