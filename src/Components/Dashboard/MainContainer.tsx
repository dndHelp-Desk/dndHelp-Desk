import { FC, useState, useEffect } from "react";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import { BsJustifyLeft } from "react-icons/bs";
import {
  HiOutlineSun,
  HiOutlineSparkles,
  HiOutlinePhone,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineSupport,
} from "react-icons/hi";
import darkLogo from "./logos/dndHelp-Desk.webp";
import lightLogo from "./logos/dndHelp-Desk_.webp";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation, changeTheme } from "../../Redux/Slices/UserSlice";
import { setUnread } from "../../Redux/Slices/Tickets_n_Settings_Slice";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { Link, NavLink, Outlet } from "react-router-dom";
import Home from "./Home";
import AlertsWrapper from "../Others/AlertsWrapper";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";
import Profile from "../Auth/Profile";
import Notification from "./Notification";
import SettingsTooltip from "./SettingsTooltip";
import { AppDispatch, RootState } from "../../Redux/store";
import VoicexVideoCall from "./VoicexVideoCall";

const Dashboard: FC = () => {
  const logged = useSelector(
    (state: RootState) => state.UserInfo.authenticated
  );
  const routeLocation = useSelector(
    (state: RootState) => state.UserInfo.routeLocation
  );
  const theme = useSelector((state: RootState) => state.UserInfo.theme);
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const allTickets = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const ticketsComponentDates = useSelector(
    (state: RootState) => state.Tickets.ticketsComponentDates
  );
  const unread = useSelector((state: RootState) => state.Tickets.unread);
  const notificationMsgs = useSelector(
    (state: RootState) => state.NotificationsData.messages
  );
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );
  const [openNotifications, setOpenNotification] = useState<boolean>(false);
  const [phoneToolTip, openPhone] = useState<boolean>(false);
  const [loading, setLoading] = useState<any>(false);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  //Filter Unread messages =======================
  useEffect(() => {
    if (user[0]?.access !== "client") {
      dispatch(
        setUnread(
          allTickets &&
            allTickets?.filter(
              (ticket) =>
                ticket?.readStatus !== "read" &&
                ticket?.recipient_email?.replace(/\s/g, "").toLowerCase() ===
                  user[0]?.email?.replace(/\s/g, "").toLowerCase()
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
                    email?.replace(/\s/g, "").toLowerCase()
                  )
                  .includes(user[0]?.email?.replace(/\s/g, "").toLowerCase())
            )
        )
      );
    }
  }, [allTickets, dispatch, user]);

  //Small Screen Menu ===================
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuModalRef = useOnClickOutside(() => {
    setShowMenu(false);
  });

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
    dashboardData?.filter(
      (data) =>
        data.date >= new Date(ticketsComponentDates?.startDate).getTime() &&
        data.date <= new Date(ticketsComponentDates?.endDate).getTime()
    ).length <= 0
      ? setLoading(true)
      : setLoading(false);
    dashboardData?.filter(
      (data) =>
        data.date >= new Date(ticketsComponentDates?.startDate).getTime() &&
        data.date <= new Date(ticketsComponentDates?.endDate).getTime()
    ).length <= 0 && setTimeout(() => setLoading(false), 60000);
    return clearTimeout();
  }, [dashboardData, ticketsComponentDates]);

  if (logged !== true) {
    return <Navigate to="/login" />;
  }

  //Component =================================
  return (
    <div className={`${theme} relative`}>
      <div className="w-full dark:bg-slate-900 bg-slate-300 flex flex-col selection:bg-blue-600 selection:text-slate-100">
        {/**Data Fetching Components */}
        <TicketsnUserData />

        {/**Preloader =========================== */}
        <div
          className={`${
            !loading ? "hidden" : ""
          } fixed z-[9999] top-0 bottom-0 left-0 right-0 bg-[#030d2769] before:content-[''] before:h-[0.25rem] before:w-full before:bg-[#93c4fd70] before:absolute`}
        >
          <div
            id="reportsPreloader"
            className="h-[0.25rem] w-2/5 bg-blue-600 absolute top-0 transition-all"
          ></div>
        </div>

        {/**NavBar ============== */}
        <nav className="flex justify-center flex-[1] max-h-[4.5rem] w-full dark:bg-slate-800 bg-white border-b dark:border-slate-800 border-slate-300 print:hidden tracking-wide">
          {/**AlertsWrapper */}
          <AlertsWrapper />
          <div className="w-[95%] 2xl:w-[75rem] h-14 flex justify-between items-center relative z-[999]">
            {/**Other Controls and logo ================ */}
            <div className="h-full flex items-center gap-2">
              {/**Small Screen Menu Btn ================ */}
              <button
                aria-label="button"
                onClick={() => setShowMenu(showMenu === false ? true : false)}
                className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex lg:hidden"
              >
                <BsJustifyLeft className="text-2xl dark:text-gray-200 text-slate-600 flex cursor-pointer" />
              </button>

              {/**Logo ==================== */}
              <Link
                to="/"
                className="h-9 w-9 hidden lg:flex items-center justify-center overflow-hidden"
              >
                {theme !== "dark" && (
                  <img
                    src={darkLogo}
                    alt="logo"
                    className="object-cover object-center w-9 h-9"
                  />
                )}
                {theme === "dark" && (
                  <img
                    src={lightLogo}
                    alt="logo"
                    className="object-cover object-center w-9 h-9"
                  />
                )}
              </Link>

              {/**Support =================================== */}
              <div className="relative">
                <button className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold">
                  <HiOutlineSupport />
                </button>
              </div>

              {/**Change Theme =========================== */}
              <div className="h-9 w-20 p-[0.2rem] rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 overflow-hidden relative">
                <div className="w-full h-full flex">
                  <div
                    className={`h-full w-2/4 bg-white dark:bg-[#33415569] border dark:border-slate-600 border-slate-300 rounded-sm shadow transition-all duration-500 ${
                      theme === "dark" && "translate-x-[100%] "
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between absolute top-1 left-1 right-1 bottom-1">
                  <button
                    onClick={() => {
                      dispatch(changeTheme("light"));
                      window.localStorage.setItem(
                        "theme",
                        JSON.stringify("light")
                      );
                    }}
                    className="flex-[1] bg-transparent outline-none focus:outline-none flex items-center justify-center text-xs text-slate-900 dark:text-slate-300 font-medium"
                  >
                    <HiOutlineSun className="text-base" />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(changeTheme("dark"));
                      window.localStorage.setItem(
                        "theme",
                        JSON.stringify("dark")
                      );
                    }}
                    className="flex-[1] bg-tranparent outline-none focus:outline-none flex items-center justify-center text-xs text-slate-900 dark:text-slate-300 font-medium"
                  >
                    <HiOutlineSparkles className="text-base" />
                  </button>
                </div>
              </div>
            </div>

            {/**Large Screens Menu Items===================== */}
            <div className="dark:text-gray-200 text-slate-900 dark:font-medium font-semibold hidden lg:flex space-x-2 h-full">
              <NavLink
                to="/app"
                className={`TabsLinks flex ${
                  location.pathname === "/app" ? "navlinks" : ""
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/app/tickets"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/app/tickets" ? "navlinks" : ""
                }`}
              >
                Tickets
              </NavLink>
              <NavLink
                to="/app/contacts"
                end={true}
                className={`TabsLinks ${
                  user.length >= 1 && user[0].access === "client" && "hidden"
                } ${location.pathname === "/app/contacts" ? "navlinks" : ""}`}
              >
                Contacts
              </NavLink>
              <NavLink
                to="/app/reports"
                className={`TabsLinks ${
                  location.pathname === "/app/reports" ? "navlinks" : ""
                }`}
              >
                Reports
              </NavLink>
            </div>

            {/**Small Screens Menu ====================== */}
            <div
              ref={menuModalRef}
              className={`flex lg:hidden fixed top-12 left-2 w-[12rem] shadow-2xl rounded backdrop-blur-lg bg-white dark:bg-slate-900 border dark:border-slate-700 border-slate-400 ${
                showMenu ? "h-[10rem] z-[9999]" : "h-0 opacity-0  z-[-99]"
              } transition-scale duration-300 dark:text-gray-400 text-slate-600 flex flex-col gap-4 p-4 overflow-hidden`}
            >
              <NavLink
                to="/app"
                className={`TabsLinks ${
                  location.pathname === "/app" ? "navlinks" : ""
                }`}
              >
                <FaHeadset
                  className="inline-block
              "
                />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/app/tickets"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/app/tickets" ? "navlinks" : ""
                }`}
              >
                <FaReceipt
                  className="inline-block
              "
                />
                <span>Tickets</span>
              </NavLink>
              <NavLink
                to="/app/contacts"
                end={true}
                className={`TabsLinks ${
                  user.length >= 1 && user[0].access === "client" && "hidden"
                } ${location.pathname === "/app/contacts" ? "navlinks" : ""}`}
              >
                <FaUserTie
                  className="inline-block
              "
                />
                <span>Contacts</span>
              </NavLink>
              <NavLink
                to="/app/reports"
                className={`TabsLinks ${
                  location.pathname === "/app/reports" ? "navlinks" : ""
                }`}
              >
                <FaChartBar
                  className="inline-block
              "
                />
                <span>Reports</span>
              </NavLink>
            </div>

            {/*Notifications , Controls & Calls ====================*/}
            <div className="flex items-center h-full space-x-2">
              {/**Voice & Video Call =================================== */}
              <div className="relative">
                <button
                  onClick={() => {
                    openPhone(true);
                  }}
                  className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold"
                >
                  <HiOutlinePhone />
                </button>
                <VoicexVideoCall
                  phoneToolTip={phoneToolTip}
                  openPhone={openPhone}
                />
              </div>

              {/**Notifications ================================================ */}
              <abbr title="Notifications">
                <button
                  onClick={() => setOpenNotification(true)}
                  className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold"
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

              {/**Settings ================================================ */}
              <div className="rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold group">
                <abbr title="Settings">
                  <HiOutlineCog />
                </abbr>
                {/**Settings Tooltip ================================== */}
                <SettingsTooltip />
              </div>

              {/**Profile And User Settings =========================== */}
              <Profile />
            </div>
          </div>
        </nav>
        <main className="w-full h-full flex-[8] flex flex-col pb-2 items-center">
          <Home />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
