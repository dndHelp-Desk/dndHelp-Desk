import React, { useState, useEffect } from "react";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import {
  BsBoxArrowRight,
  BsChatSquareText,
  BsTextRight,
  BsBrightnessHigh,
  BsGear,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { signOut, getAuth } from "firebase/auth";
import {
  changeLocation,
  changeTheme,
  isAuthenticated,
} from "../../store/UserSlice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";
import Alert from "../Others/Alert";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";
import Profile from "../authentication/Profile";

const MainComponent = () => {
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const routeLocation = useSelector((state) => state.UserInfo.routeLocation);
  const theme = useSelector((state) => state.UserInfo.theme);
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = getAuth();

  //Small Screen Menu ===================
  const [showMenu, setShowMenu] = useState(false);
  const menuModalRef = useOnClickOutside(() => {
    setShowMenu(false);
  });

  //Sign Out User =================
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        dispatch(isAuthenticated(false));
        window.localStorage.clear();
        dispatch(changeLocation("Dial n Dine Help-Desk"));
        document.title = "Dial n Dine Help-Desk";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    window.localStorage.setItem("locationPath", routeLocation);
    document.title =
      location.pathname === "/"
        ? "Dial n Dine Help-Desk"
        : "Dial n Dine Help-Desk" + routeLocation;
    dispatch(changeLocation(location.pathname));
  }, [routeLocation, dispatch, location]);

  if (logged !== true) {
    return <Navigate to="/logIn" />;
  }

  //Component =================================
  return (
    <div className={theme}>
      <div className="dark:bg-slate-800 bg-slate-300 w-screen h-screen min-h-[60rem] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar relative flex flex-col items-center z-0">
        {/**Data Fetching Components */}
        <TicketsnUserData />
        {/**NavBar ============== */}
        <div className="flex justify-center h-[4rem] w-full bg-transparent mt-4 relative">
          {/**Alert */}
          <Alert />
          <nav className="dark:bg-slate-900 bg-slate-100 backdrop-blur-lg p-2 flex rounded-xl custom-shadow justify-between items-center w-[90%] md:w-full container 2xl:w-[72rem] relative">
            {/**Logo ==================== */}
            <svg
              className="dark:stroke-slate-400 stroke-slate-700 text-[1.5rem] font-sans fill-transparent"
              width="210"
              height="50"
              viewBox="0 0 200 50"
            >
              <text x="0" y="35">
                <tspan className="stroke-[1.5px] fill-slate-500">dnd</tspan>
                <tspan className="stroke-[.6px] dark:fill-slate-900 fill-slate-400" x="43" y="35">
                  Help-Desk
                </tspan>
              </text>
            </svg>

            {/**Large Screens Menu Items===================== */}
            <div className="dark:text-gray-400 text-slate-600 hidden lg:flex space-x-5">
              <NavLink
                to="/"
                className={`TabsLinks ${
                  location.pathname === "/" ? "navlinks" : ""
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/tickets"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/tickets" ? "navlinks" : ""
                }`}
              >
                Tickets
              </NavLink>
              <NavLink
                to="/reports"
                className={`TabsLinks ${
                  location.pathname === "/reports" ? "navlinks" : ""
                }`}
              >
                Reports
              </NavLink>
              <NavLink
                to="/contacts"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/contacts" ? "navlinks" : ""
                }`}
              >
                Contacts
              </NavLink>
            </div>

            {/**Small Screens Menu ====================== */}
            <div
              ref={menuModalRef}
              className={`flex lg:hidden fixed top-12 right-[26%] w-[8rem] z-[999] shadow-2xl rounded-lg backdrop-blur-lg bg-slate-100 dark:bg-slate-900 border border-slate-400 ${
                showMenu ? "h-[10rem]" : "h-0 opacity-0"
              } transition-scale duration-300 flex flex-col dark:text-gray-400 text-slate-600 space-y-2 p-4 justify-center overflow-hidden`}
            >
              <NavLink
                to="/"
                className={`TabsLinks ${
                  location.pathname === "/" ? "navlinks" : ""
                }`}
              >
                <FaHeadset
                  className="inline-block
              "
                />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/tickets"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/tickets" ? "navlinks" : ""
                }`}
              >
                <FaReceipt
                  className="inline-block
              "
                />
                <span>Tickets</span>
              </NavLink>
              <NavLink
                to="/reports"
                className={`TabsLinks ${
                  location.pathname === "/reports" ? "navlinks" : ""
                }`}
              >
                <FaChartBar
                  className="inline-block
              "
                />
                <span>Reports</span>
              </NavLink>
              <NavLink
                to="/contacts"
                end={true}
                className={`TabsLinks ${
                  location.pathname === "/contacts" ? "navlinks" : ""
                }`}
              >
                <FaUserTie
                  className="inline-block
              "
                />
                <span>Contacts</span>
              </NavLink>
            </div>

            {/*Notifications & Controls ====================*/}
            <div className="flex space-x-2">
              {/**Small Screen Menu Btn ================ */}
              <button
                onClick={() => setShowMenu(showMenu === false ? true : false)}
                className="dark:text-gray-400 text-slate-600 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex lg:hidden"
              >
                <BsTextRight className="text-2xl dark:text-gray-400 text-slate-600 flex cursor-pointer" />
              </button>

              {/**Change Theme =========================== */}
              <button
                onClick={() => {
                  dispatch(changeTheme(theme === "dark" ? "light" : "dark"));
                  window.localStorage.setItem(
                    "theme",
                    JSON.stringify(theme === "dark" ? "light" : "dark")
                  );
                }}
                className="dark:text-gray-400 text-slate-600 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold"
              >
                <abbr title="theme">
                  <BsBrightnessHigh />
                </abbr>
              </button>

              {/**Chat ================================================ */}
              <button className="dark:text-gray-400 text-slate-600 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold">
                <abbr title="Chat">
                  <BsChatSquareText />
                </abbr>
              </button>

              {/**Settings ================================================ */}
              <button className="dark:text-gray-400 text-slate-600 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold">
                <NavLink to="/settings/account">
                  <abbr title="Settings">
                    <BsGear />
                  </abbr>
                </NavLink>
              </button>

              {/**Sign-Out ================================ */}
              <button
                onClick={() => {
                  signOutUser();
                }}
                className="dark:text-gray-400 text-slate-600 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 hover:text-slate-100 items-center justify-center flex font-bold"
              >
                <abbr className="relative" title="sign-out">
                  <BsBoxArrowRight />
                </abbr>
              </button>

              {/**Profile And User Settings =========================== */}
              <Profile />
            </div>
          </nav>
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <Main />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
