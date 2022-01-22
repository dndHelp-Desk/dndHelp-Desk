import React, { useState } from "react";
import {
  FaDyalog,
  FaChartBar,
  FaReceipt,
  FaHeadset,
  FaUserTie,
  FaAlignRight,
} from "react-icons/fa";
import { BsFillBellFill, BsGearFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import User from "./User";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";

const MainComponent = () => {
  const [menu, setMenu] = useState(false);
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const location = useLocation();

  if (logged !== true) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-slate-300 w-screen h-screen min-h-[60rem] overflow-hidden relative">
      {/**Small Screens Menu ====================== */}
      <div
        className={`flex lg:hidden absolute top-12 right-[7%] w-[8rem] border border-slate-800 z-[100] shadow-2xl rounded-lg bg-slate-400 ${
          menu ? "h-[10rem]" : "h-0 opacity-0"
        } transition-scale duration-300 flex flex-col text-slate-900 space-y-2 p-4 justify-center overflow-hidden`}
      >
        <NavLink
          to="/help-desk"
          className={`TabsLinks ${
            location.pathname === "/help-desk" ? "navlinks" : ""
          } ${(document.title = `Dial n Dine Help-Desk${location.pathname}`)}`}
        >
          <FaHeadset
            className="inline-block
			  "
          />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/help-desk/reports"
          className={`TabsLinks ${
            location.pathname === "/help-desk/reports" ? "navlinks" : ""
          }`}
        >
          <FaChartBar
            className="inline-block
			  "
          />
          <span>Reports</span>
        </NavLink>
        <NavLink
          to="/help-desk/tickets"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <FaReceipt
            className="inline-block
			  "
          />
          <span>Tickets</span>
        </NavLink>
        <NavLink
          to="/help-desk/contacts"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <FaUserTie
            className="inline-block
			  "
          />
          <span>Contacts</span>
        </NavLink>
        <NavLink
          to="/help-desk/settings"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <BsGearFill
            className="inline-block
			  "
          />
          <span>Settings</span>
        </NavLink>
      </div>

      {/**NavBar ============== */}
      <nav className="sticky top-0 h-[4rem] w-full bg-slate-900 backdrop-blur-lg p-2 px-[40px] flex justify-between items-center">
        <h3 className="uppercase font-bold text-xl text-slate-300 flex items-center">
          <FaDyalog className="inline-block" />
          ial n' Dine
        </h3>

        {/**Large Screens Menu Items===================== */}
        <div className="text-gray-200 hidden lg:flex space-x-5">
          <NavLink
            to="/help-desk"
            className={`TabsLinks ${
              location.pathname === "/help-desk" ? "navlinks" : ""
            } ${(document.title = `Dial n Dine Help-Desk${location.pathname}`)}`}
          >
            <FaHeadset
              className="inline-block
			  "
            />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/help-desk/reports"
            className={`TabsLinks ${
              location.pathname === "/help-desk/reports" ? "navlinks" : ""
            }`}
          >
            <FaChartBar
              className="inline-block
			  "
            />
            <span>Reports</span>
          </NavLink>
          <NavLink
            to="/help-desk/tickets"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            <FaReceipt
              className="inline-block
			  "
            />
            <span>Tickets</span>
          </NavLink>
          <NavLink
            to="/help-desk/contacts"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            <FaUserTie
              className="inline-block
			  "
            />
            <span>Contacts</span>
          </NavLink>
          <NavLink
            to="/help-desk/settings"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            <BsGearFill
              className="inline-block
			  "
            />
            <span>Settings</span>
          </NavLink>
        </div>

        {/*Notifications Control ====================*/}
        <div className="flex space-x-4">
          {/**Small Screen Menu Btn ================ */}
          <FaAlignRight
            onClick={() => setMenu(menu === false ? true : false)}
            className="font-semibold text-xl text-gray-200 lg:hidden flex cursor-pointer"
          />

          <button className="text-slate-300 text-xl relative">
            <abbr title="notifiations">
              <BsFillBellFill />
              <span
                className={`flex h-3 w-3 absolute top-[-5%] right-[-5%] scale-100 z-[999]`}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </abbr>
          </button>
        </div>
      </nav>
      <User />
      <Main />
      <Outlet />
    </div>
  );
};

export default MainComponent;
