import { createSlice } from "@reduxjs/toolkit";

const initialId = () => {
  const init = window.localStorage.getItem("threadId");
  return JSON.parse(init);
};

const initialState = {
  allTickets: [],
  threadMessage: [],
  threadId: initialId(),
  contacts: [],
  settings: [],
  filters: {
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).toLocaleDateString(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      31
    ).toLocaleDateString(),
    brand: "",
    ticket_id: "",
    agent: "",
    category: "",
    complainant_number: "",
    status: "",
  },
  filteredTickets: [],
  frequentlyAsked: [],
};

export const TicketsSlice = createSlice({
  name: "Tickets",
  initialState,
  reducers: {
    addAllTickets: (state, action) => {
      state.allTickets = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    loadSettings: (state, action) => {
      state.settings = action.payload;
    },
    setThreadMessage: (state, action) => {
      state.threadMessage = action.payload;
    },
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    loadFrequentlyAsked: (state, action) => {
      state.frequentlyAsked = action.payload;
    },
    filter: (state, action) => {
      state.filters = action.payload;
    },
    updateFilteredTickets: (state, action) => {
      state.filteredTickets = action.payload.sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );
    },
  },
});

export const {
  addAllTickets,
  setContacts,
  loadSettings,
  setThreadMessage,
  setThreadId,
  loadFrequentlyAsked,
  filter,
  updateFilteredTickets,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
