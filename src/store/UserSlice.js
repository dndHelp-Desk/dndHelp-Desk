import { createSlice } from "@reduxjs/toolkit";

export const initialLocation = () =>
  window.localStorage.getItem("locationPath") || "Dial n Dine Help-Desk";

const initialState = {
  username: "Unkown User",
  allMembers: [],
  member_details: [{
    access: "none",
    dept: "Unkown Dept",
    email: "example@gmail.com",
    id: "A1w2FvwWbcGBECBUj",
    name: "User Loader",
  }],
  authenticated: false,
  routeLocation: initialLocation(),
  toDo:[]
};

export const UserSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    addAllMembers: (state, action) => {
      state.allMembers = action.payload;
    },
    updateUser: (state, action) => {
      state.member_details = action.payload;
    },
    isAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    changeLocation: (state, action) => {
      state.routeLocation = action.payload;
    },
    setToDo:(state,action)=>{
      state.toDo  = action.payload
    }
  },
});

export const { isAuthenticated, updateUser, addAllMembers, changeLocation, setToDo } =
  UserSlice.actions;

export default UserSlice.reducer;
