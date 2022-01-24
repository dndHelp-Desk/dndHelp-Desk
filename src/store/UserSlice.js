import { createSlice } from "@reduxjs/toolkit";

export const initialLocation = () => window.localStorage.getItem("locationPath") || "Dial n Dine Help-Desk";

const initialState = {
  username: "Unkown User",
  email: "",
  authenticated: false,
  routeLocation: initialLocation(),
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
    changeLocation:(state,action)=>{
      state.routeLocation = action.payload
    }
  },
});

export const { isAuthenticated, updateUser ,changeLocation} = UserSlice.actions;

export default UserSlice.reducer;
