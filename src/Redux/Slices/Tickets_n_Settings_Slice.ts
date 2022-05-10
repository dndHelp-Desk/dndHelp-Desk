import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialId: string | null = window.localStorage.getItem("threadId");
const initialTickestDate = window.localStorage.getItem("ticketsDate");
const initialReportsDate = window.localStorage.getItem("reportsDate");

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
  filterDates: Date | any;
  ticketsComponentDates: Date | any;
  dashboardData: string[] | any[];
  reportsData: string[] | any[];
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
        startDate: new Date(
          JSON.parse(initialTickestDate).startDate
        ).toLocaleDateString(),
        endDate: new Date(
          JSON.parse(initialTickestDate).endDate
        ).toLocaleDateString(),
      }
    : {
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toLocaleDateString(),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          31
        ).toLocaleDateString(),
      },
  filterDates: initialReportsDate
    ? {
        startDate: new Date(
          JSON.parse(initialReportsDate).startDate
        ).toLocaleDateString(),
        endDate: new Date(
          JSON.parse(initialReportsDate).endDate
        ).toLocaleDateString(),
      }
    : {
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toLocaleDateString(),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          31
        ).toLocaleDateString(),
      },
  dashboardData: [],
  reportsData: [],
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
    updateFilterDates: (state, action: PayloadAction<any>) => {
      state.filterDates = action.payload;
    },
    updateReportsData: (state, action: PayloadAction<any[]>) => {
      state.reportsData = action.payload.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    updateDashboardData: (state, action: PayloadAction<any[]>) => {
      state.dashboardData = action.payload.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
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
  updateFilterDates,
  updateReportsData,
  updateTicketsComponentDates,
  updateDashboardData,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
