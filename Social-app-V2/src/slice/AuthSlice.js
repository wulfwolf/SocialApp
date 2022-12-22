import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload;
    },
    updateUser: (state, { payload }) => {
      state.user.followings.push(payload);
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});
