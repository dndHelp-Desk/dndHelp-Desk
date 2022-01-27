import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTickets: [],
  contacts:[],
  settings:[]
};

export const TicketsSlice = createSlice({
  name: "Tickets",
  initialState,
  reducers: {
    addAllTickets: (state, action) => {
      state.allTickets = action.payload;
    },
    setContacts:(state, action)=>{
      state.contacts = action.payload
    },
    loadSettings:(state, action)=>{
      state.settings = action.payload
    }
  },
});

export const { addAllTickets,setContacts,loadSettings } = TicketsSlice.actions;

export default TicketsSlice.reducer;
