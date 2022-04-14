import { createSlice } from "@reduxjs/toolkit";

const initialLocation = () =>
  window.localStorage.getItem("locationPath") || "Dial n Dine Help-Desk";

//Get Theme From Local Storage ==============
const initialTheme = () => {
  const currentTheme = localStorage.getItem("theme");
  return JSON.parse(currentTheme);
};

const initialState = {
  username: "Unkown User",
  allMembers: [],
  member_details: [
    {
      access: "none",
      dept: "Unkown Dept",
      email: "example@gmail.com",
      id: false,
      name: "User Loader",
      status: "offline",
      photoUrl: "",
    },
  ],
  authenticated: false,
  routeLocation: initialLocation(),
  toDo: [],
  theme:
    initialTheme() === null
      ? "light"
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : initialTheme(),
  company_name: JSON.parse(localStorage.getItem("organization_name")),
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
    setToDo: (state, action) => {
      state.toDo = action.payload;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCompany: (state, action) => {
      state.company_name = action.payload;
    },
  },
});

export const {
  isAuthenticated,
  updateUser,
  addAllMembers,
  changeLocation,
  setToDo,
  changeTheme,
  setCompany,
} = UserSlice.actions;

export default UserSlice.reducer;
