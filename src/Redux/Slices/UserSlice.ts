import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialLocation =
  window.localStorage.getItem("locationPath") || "dndHelp-Desk";

//Get Theme From Local Storage ==============
const initialTheme = localStorage.getItem("theme");
const initialAuth = localStorage.getItem("auth") || false;

interface InitialStateType {
  username: string;
  allMembers: any[];
  member_details: any[] | any;
  authenticated: boolean | any;
  routeLocation: string;
  toDo: any[];
  theme: string | null;
  company_name: string | any;
}

const initialState: InitialStateType = {
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
      uid: "none",
    },
  ],
  authenticated: initialAuth === "true" ? true : false,
  routeLocation: initialLocation,
  toDo: [],
  theme:
    initialTheme === null
      ? "light"
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        initialTheme !== "light"
      ? "dark"
      : initialTheme,
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
} = UserSlice.actions;

export default UserSlice.reducer;
