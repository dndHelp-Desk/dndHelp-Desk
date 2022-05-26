import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialId: string | null = window.localStorage.getItem("threadId");
const initialTickestDate = window.localStorage.getItem("ticketsDate");
interface InitialStateState {
  allTickets: any[];
  threadId: string | null;
  contacts: string[] | any[];
  email_accounts: any[];
  email_templates: any[];
  company_details: string[] | any;
  categories: string[] | any[];
  settings: string[] | any[];
  unread: string[] | any[];
  imageAttachments: string[] | any[];
  ticketsComponentDates: Date | any;
  filteredTickets: string[] | any[];
  frequentlyAsked: string[] | any[];
}

const initialState: InitialStateState = {
  allTickets: [],
  threadId: initialId,
  contacts: [],
  email_accounts: [],
  email_templates: [],
  company_details: [],
  categories: [],
  settings: [],
  unread: [],
  imageAttachments: [],
  ticketsComponentDates: initialTickestDate
    ? {
        startDate: new Date(JSON.parse(initialTickestDate).startDate).getTime(),
        endDate: new Date(JSON.parse(initialTickestDate).endDate).getTime(),
      }
    : {
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).getTime(),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          31
        ).getTime(),
      },
  filteredTickets: [],
  frequentlyAsked: [],
};

export const TicketsSlice = createSlice({
  name: "Tickets",
  initialState,
  reducers: {
    addAllTickets: (state, action: PayloadAction<any[]>) => {
      state.allTickets = action.payload;
    },
    setContacts: (state, action: PayloadAction<any[]>) => {
      state.contacts = action.payload.sort((a, b) =>
        a.name < b.name ? -1 : 1
      );
    },
    loadSettings: (state, action: PayloadAction<any[]>) => {
      state.settings = action.payload;
    },
    setThreadId: (state, action: PayloadAction<string | null>) => {
      state.threadId = action.payload;
    },
    loadFrequentlyAsked: (state, action: PayloadAction<any[]>) => {
      state.frequentlyAsked = action.payload;
    },
    loadAccounts: (state, action: PayloadAction<string[] | number[]>) => {
      state.email_accounts = action.payload;
    },
    setImageArray: (state, action: PayloadAction<any[]>) => {
      state.imageAttachments = action.payload;
    },
    loadTemplates: (state, action: PayloadAction<string[] | number[]>) => {
      state.email_templates = action.payload;
    },
    setUnread: (state, action: PayloadAction<any[]>) => {
      state.unread = action.payload;
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setCompanyDetails: (state, action: PayloadAction<any[]>) => {
      state.company_details = action.payload;
    },
    updateTicketsComponentDates: (state, action: PayloadAction<any>) => {
      state.ticketsComponentDates = action.payload;
    },
    updateFilteredTickets: (state, action: PayloadAction<any[]>) => {
      state.filteredTickets = action.payload.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  },
});

export const {
  addAllTickets,
  setContacts,
  loadSettings,
  setThreadId,
  loadFrequentlyAsked,
  loadTemplates,
  updateFilteredTickets,
  setUnread,
  setImageArray,
  loadAccounts,
  setCategories,
  setCompanyDetails,
  updateTicketsComponentDates,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
