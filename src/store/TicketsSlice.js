import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTickects: [],
};

export const TicketsSlice = createSlice({
  name: "Tickects",
  initialState,
  reducers: {
    addAllTickects: (state, action) => {
      state.allTickects = action.payload;
    },
  },
});

export const { addAllTickects } = TicketsSlice.actions;

export default TicketsSlice.reducer;
