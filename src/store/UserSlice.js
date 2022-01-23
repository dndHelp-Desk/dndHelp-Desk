import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Unkown User",
  email: "",
  authenticated: false,
};

export const UserSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.email = action.payload[0];
      state.username = action.payload[1];
    },
    isAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { isAuthenticated, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
