import { FC } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BsLightningChargeFill,
  BsFillPlusSquareFill,
  BsBookHalf,
} from "react-icons/bs";
import lightLogo from "./images/dndHelp-Desk_Light.webp";
import TicketStatus from "./TicketStatus";
import DataFetching from "./DataFetching";
import Help from "../Others/Help";

const SupportHome: FC = () => {
  const location = useLocation();

  //Component =======================================
  return (
    <div className="bg-slate-300 min-w-screen min-h-screen pb-6 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar relative">
      <div className="w-full h-[5rem] bg-slate-900 px-6 flex items-center justify-between">
        {/**Logo ==================== */}
        <div className="h-full flex items-center justify-center overflow-hidden pt-1">
          <img
            src={lightLogo}
            alt="logo"
            className="object-cover object-center w-[12rem]"
          />
        </div>

        {/**Login if You are a Member ====================== */}
        <div className="flex space-x-4 items-center">
          <NavLink to="/logIn">
            <button
              className="bg-blue-700 px-6 p-2 rounded text-slate-100 font-bold text-sm tracking-wide uppercase outline-none
					 focus:outline-none hover:opacity-90 transition-all duration-300 focus:ring focus:ring-blue-600"
            >
              Login
            </button>
          </NavLink>
        </div>
      </div>

      {/** */}
      <nav className="w-full h-[2.5rem] bg-slate-600 px-7 flex items-center space-x-4 whitespace-nowrap overflow-hidden overflow-x-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        <NavLink
          to="/support"
          className={`text-sm font-[600] text-slate-300  font-sans h-full items-center flex ${
            location.pathname === "/support" ? "supportlinks" : ""
          }`}
        >
          <BsLightningChargeFill className="inline" />
          <span>Ticket Status</span>
        </NavLink>
        <NavLink
          to="/support/new-ticket"
          className={`text-sm font-[600] text-slate-300 font-sans h-full space-x-1 items-center flex ${
            location.pathname === "/support/new-ticket" ? "supportlinks" : ""
          }`}
        >
          <BsFillPlusSquareFill className="inline" />
          <span>New Tickect</span>
        </NavLink>
        <NavLink
          to="/support/knowledge_base"
          className={`text-sm font-[600] text-slate-300 font-sans h-full space-x-1 items-center flex ${
            location.pathname === "/support/knowledge_base"
              ? "supportlinks"
              : ""
          }`}
        >
          <BsBookHalf className="inline" />
          <span>Knowledge Base</span>
        </NavLink>
      </nav>
      <TicketStatus />
      <Help />
      <DataFetching />
      <Outlet />
    </div>
  );
};

export default SupportHome;
