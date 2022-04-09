import React, { useState, useEffect } from "react";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import {
  BsBell,
  BsJustifyLeft,
  BsGear,
} from "react-icons/bs";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import darkLogo from "./logos/dndHelp-Desk.png";
import lightLogo from "./logos/dndHelp-Desk_.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation, changeTheme } from "../../store/UserSlice";
import {
  updateFilteredTickets,
  setUnread,
} from "../../store/Tickets_n_Settings_Slice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { Link, NavLink, Outlet } from "react-router-dom";
import Home from "./Home";
import Alert from "../Others/Alert";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";
import Profile from "../authentication/Profile";
import Notification from "./Notifications & Chat/Notification";
import SettingsTooltip from "./SettingsTooltip";

const MainComponent = () => {
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const routeLocation = useSelector((state) => state.UserInfo.routeLocation);
  const theme = useSelector((state) => state.UserInfo.theme);
  const user = useSelector((state) => state.UserInfo.member_details);
  const [openNotifications, setOpenNotification] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const unread = useSelector((state) => state.Tickets.unread);
  const notificationMsgs = useSelector(
    (state) => state.NotificationsData.messages
  );

  useEffect(() => {
    dispatch(
      setUnread(
        allTickets.length >= 1 &&
          allTickets.filter(
            (ticket) =>
              ticket.readStatus !== "read" &&
              ticket.recipient_email === user[0].email
          )
      )
    );
  }, [allTickets, dispatch, user]);

  //Small Screen Menu ===================
  const [showMenu, setShowMenu] = useState(false);
  const menuModalRef = useOnClickOutside(() => {
    setShowMenu(false);
  });

  useEffect(() => {
    window.localStorage.setItem("locationPath", routeLocation);
    document.title =
      location.pathname === "/"
        ? "Dial n Dine Help-Desk"
        : "Dial n Dine Help-Desk" + routeLocation.split("/").join(" | ");
    dispatch(changeLocation(location.pathname));
  }, [routeLocation, dispatch, location]);

  //FilterTckets Based on user's access ========
  useEffect(() => {
    if (user.length >= 1) {
      if (allTickets.length >= 1 && user[0].access === "admin") {
        dispatch(
          updateFilteredTickets(
            allTickets.filter((ticket) => ticket.message_position === 1)
          )
        );
      } else if (allTickets.length >= 1 && user[0].access === "agent") {
        dispatch(
          updateFilteredTickets(
            allTickets.filter(
              (ticket) =>
                ticket.message_position === 1 &&
                ticket.agent_email === user[0].email
            )
          )
        );
      } else if (allTickets.length >= 1 && user[0].access === "client") {
        dispatch(
          updateFilteredTickets(
            user[0].companies &&
              allTickets.filter(
                (ticket) =>
                  ticket.message_position === 1 &&
                  user[0].companies
                    .split(",")
                    .some(
                      (msg) =>
                        msg.toLowerCase().replace(/\s/g, "") ===
                        ticket.branch_company.toLowerCase().replace(/\s/g, "")
                    )
              )
          )
        );
      }
    }
  }, [allTickets, dispatch, user]);

  if (logged !== true) {
    return <Navigate to="/logIn" />;
  }

  //Component =================================
  return (
    <div className={`${theme} relative`}>
      <main className="w-full dark:bg-slate-900 bg-slate-200 flex flex-col selection:bg-blue-600 selection:text-slate-100">
        {/**Data Fetching Components */}
        <TicketsnUserData />

        {/**NavBar ============== */}
        <nav className="flex justify-center flex-[1] max-h-[4.5rem] w-full dark:bg-slate-800 bg-white border-b dark:border-slate-800 border-slate-300 print:hidden">
          {/**Alert */}
          <Alert />
          <div className="container w-[90%] md:w-full 2xl:w-[72rem] backdrop-blur-lg py-2 flex justify-between items-center relative z-[999]">
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

              {/**Change Theme =========================== */}
              <div className="h-9 w-32 p-1 rounded dark:bg-[#0f172a91] bg-slate-200 overflow-hidden relative">
                <div className="w-full h-full flex">
                  <div
                    className={`h-full w-2/4 bg-white dark:bg-slate-700 border dark:border-slate-700 border-slate-200 rounded shadow-lg transition-all duration-500 ${
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
                    className="flex-[1] bg-transparent outline-none focus:outline-none flex items-center justify-center space-x-1 p-1 px-2 text-xs text-slate-900 dark:text-slate-300 font-medium"
                  >
                    <HiOutlineSun className="text-sm" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(changeTheme("dark"));
                      window.localStorage.setItem(
                        "theme",
                        JSON.stringify("dark")
                      );
                    }}
                    className="flex-[1] bg-tranparent outline-none focus:outline-none flex items-center justify-center space-x-1 p-1 px-2 text-xs text-slate-900 dark:text-slate-300 font-medium"
                  >
                    <HiOutlineMoon className="text-sm" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>

            {/**Large Screens Menu Items===================== */}
            <div className="dark:text-gray-200 text-slate-900 dark:font-medium font-semibold hidden lg:flex space-x-5">
              <NavLink
                to="/app"
                className={`TabsLinks  ${
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
              className={`flex lg:hidden fixed top-12 left-0 w-[10rem] z-[999] shadow-2xl rounded backdrop-blur-lg bg-white dark:bg-slate-900 border dark:border-slate-700 border-slate-400 ${
                showMenu ? "h-[10rem]" : "h-0 opacity-0"
              } transition-scale duration-300 dark:text-gray-400 text-slate-600 flex flex-col gap-4 p-4 justify-center overflow-hidden`}
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

            {/*Notifications & Controls ====================*/}
            <div className="flex items-center h-full space-x-2">
              {/**Settings ================================================ */}
              <div className="border dark:border-slate-700 border-slate-200 dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold group">
                <abbr title="Settings">
                  <BsGear />
                </abbr>
                {/**Settings Tooltip ================================== */}
                <SettingsTooltip />
              </div>

              {/**Notifications ================================================ */}
              <abbr title="Notifications">
                <button
                  onClick={() => setOpenNotification(true)}
                  className="border dark:border-slate-700 border-slate-200 dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-9 w-9 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-200 items-center justify-center flex font-bold"
                >
                  <BsBell />
                  {unread.length >= 1 ||
                    (notificationMsgs.length >= 1 && (
                      <span className="flex h-2 w-2 absolute top-1 right-1">
                        <span className="animate-ping absolute inline-flex rounded-full bg-red-500 opacity-75 h-2 w-2"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    ))}
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
          </div>
        </nav>
        <section className="w-full h-full flex-[8] flex flex-col pb-2 items-center">
          <Home />
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainComponent;
