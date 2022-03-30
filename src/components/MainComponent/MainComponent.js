import React, { useState, useEffect } from "react";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import {
  BsBell,
  BsJustifyLeft,
  BsBrightnessHigh,
  BsGear,
  BsMoonStars,
} from "react-icons/bs";
import darkLogo from "./logos/dndHelp-Desk_Dark.png";
import lightLogo from "./logos/dndHelp-Desk_Light.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation, changeTheme } from "../../store/UserSlice";
import {
  updateFilteredTickets,
  setUnread,
} from "../../store/Tickets_n_Settings_Slice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";
import Alert from "../Others/Alert";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";
import Profile from "../authentication/Profile";
import Notification from "./Notifications & Chat/Notification";
import LogRocket from "logrocket";
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

  //Trackign Issues  ========================
  LogRocket.init("g9yqq9/dndhelp-desk");
  // This is an example script - don't forget to change it!
  LogRocket.identify(user[0].name, {
    name: user[0].name,
    email: user[0].email,
  });

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
  }, [allTickets, dispatch, user]);

  if (logged !== true) {
    return <Navigate to="/logIn" />;
  }

  //Component =================================
  return (
    <div className={`${theme} relative`}>
      <div className="w-full min-h-[45rem] h-screen dark:bg-slate-900 bg-slate-100 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar flex flex-col selection:bg-blue-600 selection:text-slate-100">
        {/**Data Fetching Components */}
        <TicketsnUserData />
        {/**NavBar ============== */}
        <div className="flex justify-center flex-[1] max-h-[4.5rem] w-full dark:bg-slate-800 bg-slate-200 border-b dark:border-slate-800 border-slate-300">
          {/**Alert */}
          <Alert />
          <nav className="container w-[90%] md:w-full 2xl:w-[72rem] backdrop-blur-lg p-2 flex justify-between items-center relative z-[999]">
            {/**Logo ==================== */}
            <div className="h-full hidden lg:flex items-center justify-center overflow-hidden pt-1">
              {theme !== "dark" && (
                <img
                  src={darkLogo}
                  alt="logo"
                  className="object-cover object-center w-[10rem]"
                />
              )}
              {theme === "dark" && (
                <img
                  src={lightLogo}
                  alt="logo"
                  className="object-cover object-center w-[10rem] relative after:absolute after:h-full after:w-full after:bg-slate-400"
                />
              )}
            </div>

            {/**Small Screen Menu Btn ================ */}
            <button
              aria-label="button"
              onClick={() => setShowMenu(showMenu === false ? true : false)}
              className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex lg:hidden"
            >
              <BsJustifyLeft className="text-2xl dark:text-gray-200 text-slate-600 flex cursor-pointer" />
            </button>
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
                  user[0].access === "client" && "hidden"
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
              className={`flex lg:hidden fixed top-14 left-0 w-[8rem] z-[999] shadow-2xl rounded-lg backdrop-blur-lg bg-white dark:bg-slate-900 border border-slate-400 ${
                showMenu ? "h-[10rem]" : "h-0 opacity-0"
              } transition-scale duration-300 flex flex-col dark:text-gray-400 text-slate-600 space-y-2 p-4 justify-center overflow-hidden`}
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
                  user[0].access === "client" && "hidden"
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
            <div className="flex space-x-2">
              {/**Change Theme =========================== */}
              <abbr title="theme">
                <div className="w-20 flex justify-between rounded-xl p-1 border dark:border-slate-700 border-slate-400">
                  <button
                    aria-label="button"
                    onClick={() => {
                      dispatch(
                        changeTheme("light")
                      );
                      window.localStorage.setItem(
                        "theme",
                        JSON.stringify("light")
                      );
                    }}
                    className={`dark:text-gray-200 ${
                      theme !== "dark" && "bg-slate-400"
                    } text-slate-900 text-xl relative focus:outline-none outline-none h-8 w-8 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold`}
                  >
                    <BsBrightnessHigh />
                  </button>
                  <button
                    aria-label="button"
                    onClick={() => {
                      dispatch(
                        changeTheme("dark")
                      );
                      window.localStorage.setItem(
                        "theme",
                        JSON.stringify("dark")
                      );
                    }}
                    className={`dark:text-gray-200 ${
                      theme === "dark" && "bg-slate-700"
                    } text-slate-900 text-xl relative focus:outline-none outline-none h-8 w-8 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold`}
                  >
                    <BsMoonStars />
                  </button>
                </div>
              </abbr>

              {/**Notifications ================================================ */}
              <abbr title="Notifications">
                <button
                  onClick={() => setOpenNotification(true)}
                  className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold"
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

              {/**Settings ================================================ */}
              <NavLink
                role="button"
                aria-label="button"
                to="/app/settings/account"
                className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold group"
              >
                <abbr title="Settings">
                  <BsGear />
                </abbr>
                {/**Settings Tooltip ================================== */}
                <SettingsTooltip />
              </NavLink>

              {/**Profile And User Settings =========================== */}
              <Profile />
            </div>
          </nav>
        </div>
        <main className="w-full h-full flex-[8] flex flex-col pb-2 items-center">
          <Main />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainComponent;
