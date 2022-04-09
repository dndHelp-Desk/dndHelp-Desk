import { createSlice } from "@reduxjs/toolkit";

const initialId = () => {
  const init = window.localStorage.getItem("threadId");
  return JSON.parse(init);
};

const initialState = {
  allTickets: [],
  threadId: initialId(),
  contacts: [],
  email_accounts:[],
  email_templates: [],
  company_details:[],
  categories: [],
  settings: [],
  unread:[],
  imageAttachments:[],
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
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    loadFrequentlyAsked: (state, action) => {
      state.frequentlyAsked = action.payload;
    },
    loadAccounts: (state, action) => {
      state.email_accounts = action.payload;
    },
    setImageArray: (state, action) => {
      state.imageAttachments = action.payload;
    },
    loadTemplates: (state, action) => {
      state.email_templates = action.payload;
    },
    setUnread: (state, action) => {
      state.unread = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCompanyDetails: (state, action) => {
      state.company_details = action.payload;
    },
    updateFilteredTickets: (state, action) => {
      state.filteredTickets = action.payload.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
  loadTemplates,
  updateFilteredTickets,
  setUnread,setImageArray,
  loadAccounts,
  setCategories,
  setCompanyDetails,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
