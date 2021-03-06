import { FC, useState, useEffect } from "react";
import {
  TbLayoutDashboard,
  TbInbox,
  TbAddressBook,
  TbChartDonut,
  TbSettings,
  TbBrightnessUp,
  TbLayoutSidebar,
} from "react-icons/tb";
import { HiSun } from "react-icons/hi";
import { HiOutlineSpeakerphone, HiOutlineBell } from "react-icons/hi";
import lightLogo from "../../Assets/logos/dndHelp-desk_ShortLight.webp";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation, changeTheme } from "../../Redux/Slices/UserSlice";
import {
  setUnread,
  changeLoadingStatus,
} from "../../Redux/Slices/Tickets_n_Settings_Slice";
import { Link, NavLink, Outlet } from "react-router-dom";
import Home from "./Home";
import AlertsWrapper from "../../Components/Toast Notifications/AlertsWrapper";
import TicketsnUserData from "../../Adapters/Data_Fetching/TicketsnUserData";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import Profile from "../Auth/Profile";
import Notification from "./Notification";
import SettingsTooltip from "./SettingsTooltip";
import { AppDispatch, RootState } from "../../Redux/store";
import WhatsNew from "./WhatsNew";
import NavlinkToolTip from "./NavlinkToolTip";
import UniversalSearch from "./UniversalSearch";
import DatePicker from "../../Components/DatePicker";

const Dashboard: FC = () => {
  const logged = useSelector(
    (state: RootState) => state.UserInfo.authenticated
  );
  const routeLocation = useSelector(
    (state: RootState) => state.UserInfo.routeLocation
  );
  const loadingStatus = useSelector(
    (state: RootState) => state.Tickets.loadingStatus
  );
  const [smallMenuOpen, openMenu] = useState<boolean>(false);
  const menuStatusListener = useClickOutside(() => {
    openMenu(false);
  });
  const theme = useSelector((state: RootState) => state.UserInfo.theme);
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const allTickets = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const unread = useSelector((state: RootState) => state.Tickets.unread);
  const notificationMsgs = useSelector(
    (state: RootState) => state.NotificationsData.messages
  );
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );
  const [openDatePicker, setDateOpen] = useState<boolean>(false);
  const [openNotifications, setOpenNotification] = useState<boolean>(false);
  const [whatsNewOpen, openWhatsNew] = useState<boolean>(false);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  //Top Search States ============
  const [option, setOption] = useState<string>("all");
  const [searchValue, setValue] = useState<any>("");
  const [searchOpen, setSearch] = useState<boolean>(false);

  //Filter Unread messages =======================
  useEffect(() => {
    if (user[0]?.access !== "client") {
      dispatch(
        setUnread(
          allTickets &&
            allTickets?.filter(
              (ticket) =>
                ticket?.readStatus !== "read" &&
                ticket?.recipient_email?.replace(/\s/g, "")?.toLowerCase() ===
                  user[0]?.email?.replace(/\s/g, "")?.toLowerCase()
            )
        )
      );
    } else if (user[0]?.companies.length >= 1 && user[0]?.access === "client") {
      dispatch(
        setUnread(
          allTickets &&
            allTickets?.filter(
              (ticket) =>
                ticket.readStatus !== "read" &&
                ticket?.recipient_email
                  .split(",")
                  .map((email: string) =>
                    email?.replace(/\s/g, "")?.toLowerCase()
                  )
                  .includes(user[0]?.email?.replace(/\s/g, "")?.toLowerCase())
            )
        )
      );
    }
  }, [allTickets, dispatch, user]);

  useEffect(() => {
    window.localStorage.setItem("locationPath", routeLocation);
    document.title =
      location.pathname === "/"
        ? `dndHelp-Desk | ${company_details?.name ? company_details?.name : ""}`
        : `dndHelp-Desk | ${
            company_details?.name ? company_details?.name : ""
          } ${routeLocation.split("/").join(" | ")}`;
    dispatch(changeLocation(location.pathname));
  }, [routeLocation, dispatch, location, company_details]);

  //Check if The data is loading
  useEffect(() => {
    loadingStatus === true &&
      setTimeout(() => {
        dispatch(changeLoadingStatus(false));
      }, 60000);
    return clearTimeout();
  }, [loadingStatus, dispatch]);
  window.onload = () => {
    dispatch(changeLoadingStatus(true));
  };

  if (logged !== true) {
    return <Navigate to="/login" />;
  }

  //Component =================================
  return (
    <div className={`${theme} relative`}>
      <div className="w-full dark:bg-slate-750 bg-slate-200 selection:bg-blue-600 selection:text-slate-100 flex">
        {/**Data Fetching Components */}
        <TicketsnUserData />

        {/**Preloader =========================== */}
        <div
          className={`${
            loadingStatus ? "" : "hidden"
          } fixed z-[9999] top-0 bottom-0 left-0 right-0 bg-[#030d2769] before:content-[''] before:h-[0.25rem] before:w-full before:bg-[#93c4fd70] before:absolute`}
        >
          <div
            id="reportsPreloader"
            className="h-[0.25rem] w-2/5 bg-blue-600 absolute top-0 transition-all"
          ></div>
        </div>
        {/**AlertsWrapper */}
        <AlertsWrapper />

        {/**Side NavBar ================= */}
        <div
          ref={menuStatusListener}
          role="navigation"
          className={`${
            smallMenuOpen ? "fixed left-0" : "fixed left-[-200%]"
          } transition-all duration-150 shadow-2xl md:shadow-none z-[9999] h-screen w-[4.5rem] bg-slate-800 no-scrollbar no-scrollbar::-webkit-scrollbar p-2 pb-4 pt-3 md:left-0 md:relative flex flex-col justify-between items-center border-r dark:border-slate-700 border-slate-300`}
        >
          <div className="w-full space-y-4">
            {/**Logo ==================== */}
            <div className="w-full flex justify-center border-b-2 border-slate-500 pb-2">
              <Link
                to="/"
                className="h-9 w-9 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={lightLogo}
                  alt="logo"
                  className="object-cover object-center w-9 h-9"
                />
              </Link>
            </div>

            {/**Menu Options ============ */}
            <div className="w-full flex flex-col items-center space-y-3 p-1">
              <div className="relative group">
                <NavLink
                  to="/app"
                  className={`h-10 w-10 outline-none focus:outline-none flex justify-center items-center text-2xl hover:bg-slate-700 transition-all text-slate-300 rounded ${
                    location.pathname === "/app" ? "bg-slate-700" : ""
                  }`}
                >
                  <TbLayoutDashboard />
                </NavLink>
                <NavlinkToolTip name={"Dashboard"} />
              </div>
              <div className="relative group">
                <NavLink
                  to="/app/tickets"
                  className={`h-10 w-10 outline-none focus:outline-none flex justify-center items-center text-2xl hover:bg-slate-700 transition-all text-slate-300 rounded ${
                    location.pathname === "/app/tickets" ? "bg-slate-700" : ""
                  }`}
                >
                  <TbInbox />
                </NavLink>
                <NavlinkToolTip name={"Tickets"} />
              </div>
              <div
                className={`relative group ${
                  user[0]?.access === "client" ? "hidden" : ""
                }`}
              >
                <NavLink
                  to="/app/contacts"
                  className={`h-10 w-10 outline-none focus:outline-none flex justify-center items-center text-2xl hover:bg-slate-700 transition-all text-slate-300 rounded ${
                    location.pathname === "/app/contacts" ? "bg-slate-700" : ""
                  }`}
                >
                  <TbAddressBook />
                </NavLink>
                <NavlinkToolTip name={"Contacts"} />
              </div>
              <div className="relative group">
                <NavLink
                  to="/app/reports"
                  className={`h-10 w-10 outline-none focus:outline-none flex justify-center items-center text-2xl hover:bg-slate-700 transition-all text-slate-300 rounded ${
                    location.pathname === "/app/reports" ? "bg-slate-700" : ""
                  }`}
                >
                  <TbChartDonut />
                </NavLink>
                <NavlinkToolTip name={"Reports"} />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2 items-center justify-center">
            {/**Change Theme =========================== */}
            <div className="relative group">
              <button
                onClick={() => {
                  if (theme === "dark") {
                    dispatch(changeTheme("light"));
                    window.localStorage.setItem(
                      "theme",
                      JSON.stringify("light")
                    );
                  } else {
                    dispatch(changeTheme("dark"));
                    window.localStorage.setItem(
                      "theme",
                      JSON.stringify("dark")
                    );
                  }
                }}
                className="h-9 w-10 rounded bg-inherit border border-slate-500 hover:text-slate-500 text-slate-50 text-xl p-1 relative transition-all duration-200 outline-none focus:outline-none items-center justify-center flex"
              >
                {theme === "dark" ? <TbBrightnessUp /> : <HiSun />}
              </button>
              <NavlinkToolTip name={"Theme"} />
            </div>
            {/**Settings ================================================ */}
            <div className="rounded  bg-inherit border border-slate-500  hover:text-slate-500 text-slate-100 text-xl relative focus:outline-none outline-none h-9 w-10 items-center justify-center flex font-bold group cursor-pointer">
              <TbSettings />
              {/**Settings Tooltip ================================== */}
              <SettingsTooltip />
            </div>
          </div>
        </div>
        {/**Main Body ===================== */}
        <main className="w-full h-screen flex flex-col justify-between overflow-hidden relative">
          {/**Top NavBar ============== */}
          <nav className="absolute top-0 w-full h-[3.6rem] dark:bg-slate-750 bg-slate-100 border-b dark:border-slate-700 border-slate-300 px-4 md:pl-2 flex justify-between items-center">
            <div className="h-[3.6rem] flex items-center justify-center space-x-2">
              {/**Small Menu Icon =============== */}
              <button
                onClick={() => {
                  openMenu((prev) => (prev === true ? false : true));
                }}
                className="h-9 w-9 bg-white dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-700 outline-none focus:outline-none dark:text-slate-300 text-slate-600 text-xl md:hidden flex justify-center items-center"
              >
                <TbLayoutSidebar />
              </button>
              {/**Date Picker ================ */}
              <DatePicker
                openDatePicker={openDatePicker}
                setDateOpen={setDateOpen}
              />
              {/**Universal Search  ================ */}
              <UniversalSearch
                option={option}
                setOption={setOption}
                searchOpen={searchOpen}
                setSearch={setSearch}
                searchValue={searchValue}
                setValue={setValue}
              />
            </div>

            {/*Notifications , Controls & Calls ====================*/}
            <div className="flex items-center h-full space-x-2">
              {/**What's New =================================== */}
              <div className="relative hidden md:flex">
                <button
                  onClick={() => {
                    openWhatsNew(true);
                  }}
                  className="dark:text-gray-300 text-slate-600 text-xl relative focus:outline-none outline-none h-9 w-9 rounded dark:bg-slate-800 bg-white border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold"
                >
                  <abbr title="What's New">
                    <HiOutlineSpeakerphone />
                  </abbr>
                </button>
                <WhatsNew
                  whatsNewOpen={whatsNewOpen}
                  openWhatsNew={openWhatsNew}
                />
              </div>

              {/**Notifications ================================================ */}
              <abbr title="Notifications">
                <button
                  onClick={() => setOpenNotification(true)}
                  className="dark:text-gray-300 text-slate-600 text-xl relative focus:outline-none outline-none h-9 w-9 rounded dark:bg-slate-800 bg-white border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold"
                >
                  <HiOutlineBell />
                  {(unread.length >= 1 || notificationMsgs.length >= 1) && (
                    <span className="flex h-2 w-2 absolute top-1 right-1">
                      <span className="animate-ping absolute inline-flex rounded-full bg-red-500 opacity-75 h-2 w-2"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </button>
              </abbr>
              {/**Expanded Notification & Chat  =============================== */}
              <Notification
                openNotifications={openNotifications}
                setOpenNotification={setOpenNotification}
              />

              {/**Profile And User Settings =========================== */}
              <Profile />
            </div>
          </nav>

          {/**Main container ============================== */}
          <div className="w-full h-full flex justify-center pt-[3.65rem]">
            <Home />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
