import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialLocation =
  window.localStorage.getItem("locationPath") || "dndHelp-Desk";

//Get Theme From Local Storage ==============
const initialTheme = localStorage.getItem("theme");
const initialAuth = localStorage.getItem("auth") || false;
const initialUser = localStorage.getItem("user");

interface InitialStateType {
  username: string;
  allMembers: any[];
  member_details: any[] | any;
  authenticated: boolean | any;
  routeLocation: string;
  cannedResponses: any[];
  publicCannedResponses: any[];
  toDo: any[];
  theme: string | null;
  company_name: string | any;
}

const initialState: InitialStateType = {
  username: "Unkown User",
  allMembers: [],
  member_details: initialUser
    ? [JSON.parse(initialUser)]
    : [
        {
          access: "none",
          dept: "Unkown Dept",
          email: "example@gmail.com",
          id: false,
          name: "User Loader",
          status: "offline",
          photoUrl: "",
          uid: "none",
        },
      ],
  authenticated: initialAuth === "true" ? true : false,
  routeLocation: initialLocation,
  cannedResponses: [],
  publicCannedResponses: [],
  toDo: [],
  theme:
    !initialTheme && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : initialTheme && JSON.parse(initialTheme),
  company_name: localStorage.getItem("organization_name"),
};

export const UserSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    addAllMembers: (state, action: PayloadAction<any[]>) => {
      state.allMembers = action.payload;
    },
    updateUser: (state, action: PayloadAction<any[]>) => {
      state.member_details = action.payload;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    changeLocation: (state, action: PayloadAction<string>) => {
      state.routeLocation = action.payload;
    },
    setToDo: (state, action: PayloadAction<any[]>) => {
      state.toDo = action.payload;
    },
    updateCannedRes: (state, action: PayloadAction<any[]>) => {
      state.cannedResponses = action.payload;
    },
    updatePublicCannedRes: (state, action: PayloadAction<any[]>) => {
      state.publicCannedResponses = action.payload;
    },
    changeTheme: (state, action: PayloadAction<string | null>) => {
      state.theme = action.payload;
    },
    setCompany: (state, action: PayloadAction<string | null>) => {
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
  updateCannedRes,
  updatePublicCannedRes,
} = UserSlice.actions;

export default UserSlice.reducer;
