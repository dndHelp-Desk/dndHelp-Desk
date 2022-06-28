import { FC } from "react";
import { useLocation, NavLink } from "react-router-dom";

const Sidenav: FC = () => {
  const location = useLocation();

  //Component ==================
  return (
    <div className="col-span-4 md:col-span-1 min-h-[10rem] h-fit rounded dark:bg-slate-800 bg-white border border-slate-200 dark:border-slate-700 py-4">
      <ul>
        <div className="w-full">
          <h2
            className={`text-lg font-bold font-sans text-slate-800 dark:text-slate-300  px-4 py-2 ${
              location.pathname === "/app/settings/account/general"
                ? "border-slate-800 dark:border-slate-400 border-l-2"
                : ""
            }`}
          >
            General
          </h2>
          <li
            className={`hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 px-6 py-2 ${
              location.pathname === "/app/settings/account/general"
                ? "bg-slate-200 dark:bg-slate-700"
                : ""
            }`}
          >
            <NavLink
              to="/app/settings/account/general"
              className="w-full text-sm font-medium font-sans text-slate-700 dark:text-slate-400"
            >
              Profile
            </NavLink>
          </li>
          <li
            className={`hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 px-6 py-2 ${
              location.pathname === "/app/settings/account/generl"
                ? "bg-slate-200 dark:bg-slate-700"
                : ""
            }`}
          >
            <NavLink
              to="/app/settings/account/general"
              className="w-full text-sm font-medium font-sans text-slate-700 dark:text-slate-400"
            >
              Danger Zone
            </NavLink>
          </li>
        </div>

        {/***Security ===== */}
        <div className="w-full">
          <h2
            className={`text-lg font-bold font-sans text-slate-800 dark:text-slate-300  px-4 py-2 ${
              location.pathname === "/app/settings/account/security"
                ? "border-slate-800 dark:border-slate-400 border-l-2"
                : ""
            }`}
          >
            Security
          </h2>
          <li
            className={`hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 px-6 py-2 ${
              location.pathname === "/app/settings/account/security"
                ? "bg-slate-200 dark:bg-slate-700"
                : ""
            }`}
          >
            <NavLink
              to="/app/settings/account/security"
              className="w-full text-sm font-medium font-sans text-slate-700 dark:text-slate-400"
            >
              Two-factor authentication
            </NavLink>
          </li>
        </div>

        {/***Apps ===== */}
        <div className="w-full">
          <h2
            className={`text-lg font-bold font-sans text-slate-800 dark:text-slate-300  px-4 py-2 ${
              location.pathname === "/app/settings/account/applications"
                ? "border-slate-800 dark:border-slate-400 border-l-2"
                : ""
            }`}
          >
            Applications
          </h2>
          <li
            className={`hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 px-6 py-2 ${
              location.pathname === "/app/settings/account/applications"
                ? "bg-slate-200 dark:bg-slate-700"
                : ""
            }`}
          >
            <NavLink
              to="/app/settings/account/applications"
              className="w-full text-sm font-medium font-sans text-slate-700 dark:text-slate-400"
            >
              OAuth
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidenav;
