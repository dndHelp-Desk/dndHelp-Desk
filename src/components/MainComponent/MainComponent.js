import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { FaChartBar, FaReceipt, FaHeadset, FaUserTie } from "react-icons/fa";
import { BsBell, BsGearFill, BsChatSquareText, BsTextRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { changeLocation } from "../../store/UserSlice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import User from "./User";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";
import Alert from "../Others/Alert";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";

const MainComponent = () => {
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const routeLocation = useSelector((state) => state.UserInfo.routeLocation);
  const location = useLocation();
  const dispatch = useDispatch();

  //Small Screen Mene ===================
  const [showMenu, setShowMenu] = useState(false);
  const menuModalRef = useOnClickOutside(() => {
    setShowMenu(false);
  });

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
    <div className="bg-slate-500 w-screen h-screen min-h-[60rem] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar relative">
      {/**Data Fetching Components */}
      <TicketsnUserData />
      {/**Alert */}
      <Alert />
      {/**NavBar ============== */}
      <nav className="pl-[9.5%] 2xl:pl-[15%] pr-[10.5%] 2xl:pr-[15%]  top-0 h-[4rem] w-full bg-slate-900 backdrop-blur-lg p-2 flex justify-between items-center">
        {/**Logo ==================== */}
        <svg
          className="stroke-slate-400 text-[1.5rem] font-sans fill-transparent"
          width="210"
          height="50"
          viewBox="0 0 200 50"
        >
          <text x="0" y="35">
            <tspan className="stroke-[1.5px]">dnd</tspan>
            <tspan className="stroke-[.6px]" x="43" y="35">
              Help-Desk
            </tspan>
          </text>
        </svg>

        {/**Large Screens Menu Items===================== */}
        <div className="text-gray-400 hidden lg:flex space-x-5">
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
          <NavLink
            to="/settings"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/settings" ? "navlinks" : ""
            }`}
          >
            Settings
          </NavLink>
        </div>

        {/*Notifications & Controls ====================*/}
        <div className="flex space-x-2">
          {/**Small Screen Menu Btn ================ */}
          <button
            onClick={() => setShowMenu(showMenu === false ? true : false)}
            className="text-slate-400 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl hover:bg-slate-700 items-center justify-center flex"
          >
            <BsTextRight className="text-2xl text-slate-400 lg:hidden flex cursor-pointer" />
          </button>

          <button className="text-slate-400 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl hover:bg-slate-700 items-center justify-center flex">
            <abbr className="relative" title="notifiations">
              <BsBell />
              <span
                className={`flex h-2 w-2 absolute top-[-5%] right-[-5%] scale-100 z-[999]`}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            </abbr>
          </button>

          <button className="text-slate-400 text-xl relative focus:outline-none outline-none h-10 w-10 rounded-xl hover:bg-slate-700 items-center justify-center flex">
            <abbr title="Chat">
              <BsChatSquareText />
            </abbr>
          </button>
          <div className="h-10 w-10 rounded-xl bg-slate-700 overflow-hidden">
            <img
              src={`${getAuth().currentUser.photoURL}`}
              className="object-cover object-center h-full w-full"
              alt=""
            />
          </div>
        </div>
      </nav>

      {/**Small Screens Menu ====================== */}
      <div
        ref={menuModalRef}
        className={`flex lg:hidden absolute top-12 right-[26%] w-[8rem] z-[100] shadow-2xl rounded-lg backdrop-blur-lg border border-slate-400 ${
          showMenu ? "h-[10rem]" : "h-0 opacity-0"
        } transition-scale duration-300 flex flex-col text-slate-400 space-y-2 p-4 justify-center overflow-hidden`}
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
        <NavLink
          to="/settings"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/settings" ? "navlinks" : ""
          }`}
        >
          <BsGearFill
            className="inline-block
			  "
          />
          <span>Settings</span>
        </NavLink>
      </div>
      
      <User />
      <Main />
      <Outlet />
    </div>
  );
};

export default MainComponent;
