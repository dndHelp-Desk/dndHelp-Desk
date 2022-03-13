import React, { useState, useEffect } from "react";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import {
  BsBell,
  BsJustifyLeft,
  BsBrightnessHigh,
  BsGear,
  BsCloudMoon,
} from "react-icons/bs";
import darkLogo from "./logos/dndHelp-Desk_Dark.png";
import lightLogo from "./logos/dndHelp-Desk_Light.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation, changeTheme } from "../../store/UserSlice";
import { updateFilteredTickets } from "../../store/Tickets_n_Settings_Slice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";
import Alert from "../Others/Alert";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";
import Profile from "../authentication/Profile";
import Notification from "./Notifications & Chat/Notification";

const MainComponent = () => {
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const routeLocation = useSelector((state) => state.UserInfo.routeLocation);
  const theme = useSelector((state) => state.UserInfo.theme);
  const user = useSelector((state) => state.UserInfo.member_details);
  const [openNotifications, setOpenNotification] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const newReplies =
    allTickets.length >= 1 &&
    allTickets.filter(
      (ticket) => ticket.readStatus !== "read" && ticket.from !== "agent"
    );

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
    if (allTickets.length >= 1 && user[0].access !== "agent") {
      dispatch(
        updateFilteredTickets(
          allTickets
            .filter((ticket) => ticket.message_position === 1)
        )
      );
    } else if (allTickets.length >= 1 && user[0].access === "agent") {
      dispatch(
        updateFilteredTickets(
          allTickets
            .filter(
              (ticket) =>
                ticket.message_position === 1 &&
                ticket.agent_email === user[0].email
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
      <div className="dark:bg-slate-700 bg-slate-400 w-screen min-h-screen pb-4 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar flex flex-col items-center selection:bg-blue-600 selection:text-slate-100">
        {/**Data Fetching Components */}
        <TicketsnUserData />
        {/**NavBar ============== */}
        <div className="flex justify-center h-[4rem] w-full bg-transparent mt-4">
          {/**Alert */}
          <Alert />
          <nav className="dark:bg-slate-900 bg-slate-100 backdrop-blur-lg p-2 flex rounded-xl justify-between items-center w-[90%] md:w-full container 2xl:w-[72rem] relative z-[999]">
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
              onClick={() => setShowMenu(showMenu === false ? true : false)}
              className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex lg:hidden"
            >
              <BsJustifyLeft className="text-2xl dark:text-gray-200 text-slate-600 flex cursor-pointer" />
            </button>
            {/**Large Screens Menu Items===================== */}
            <div className="dark:text-gray-200 text-slate-900 dark:font-medium font-semibold hidden lg:flex space-x-5">
              <NavLink
                to="/app"
                className={`TabsLinks ${
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
                  location.pathname === "/app/contacts" ? "navlinks" : ""
                }`}
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
                  location.pathname === "/app/contacts" ? "navlinks" : ""
                }`}
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
                <button
                  onClick={() => {
                    dispatch(changeTheme(theme === "dark" ? "light" : "dark"));
                    window.localStorage.setItem(
                      "theme",
                      JSON.stringify(theme === "dark" ? "light" : "dark")
                    );
                  }}
                  className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold"
                >
                  {theme === "dark" && <BsBrightnessHigh />}
                  {theme !== "dark" && <BsCloudMoon />}
                </button>
              </abbr>

              {/**Notifications ================================================ */}
              <abbr title="Notifications">
                <button
                  onClick={() => setOpenNotification(true)}
                  className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold"
                >
                  <BsBell />
                  {newReplies.length >= 1 && (
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
              <NavLink
                to="/app/settings/account"
                className="outline-none focus:outline-none"
              >
                <abbr title="Settings">
                  <button className="dark:text-gray-200 text-slate-900 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold">
                    <BsGear />
                  </button>
                </abbr>
              </NavLink>

              {/**Profile And User Settings =========================== */}
              <Profile />
            </div>
          </nav>
        </div>
        <main className="w-full flex flex-col items-center">
          <Main />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainComponent;
