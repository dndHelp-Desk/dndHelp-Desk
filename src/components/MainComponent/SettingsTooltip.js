import React from "react";
import {
  BsSliders,
  BsPeopleFill,
  BsChatSquareDotsFill,
  BsFileTextFill,
  BsBookHalf,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SettingsTooltip = () => {
  const user = useSelector((state) => state.UserInfo.member_details);

  //Component =======================================
  return (
    <>
      <div
        role="tooltip"
        className="min-h-[10rem] w-[13rem] z-[9999] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-2  py-5 absolute right-[-3rem] top-[3.5rem] after:content-[''] after:fixed after:top-[3.8rem] after:right-[4rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-800 after:border-b-white after:border-l-transparent items-center lg:border-t dark:border-slate-800 border-slate-300no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap overflow-hidden hidden group-hover:flex flex-col "
      >
        <h2 className="dark:text-slate-300 text-slate-800 text-xl font-bold text-left w-full px-2">
          Settings
        </h2>
        <ul className="flex w-full px-2 space-y-4 mt-4 flex-col">
          <li>
            <NavLink to="/app/settings/account" className="settingsNav">
              <BsSliders />
              <span>Account</span>
            </NavLink>
          </li>
          <li className={`${user[0].access !== "admin" && "hidden"}`}>
            <NavLink
              to="/app/settings/team"
              className={`settingsNav ${
                user[0].access !== "admin" && "hidden"
              }`}
            >
              <BsPeopleFill />
              <span>Team</span>
            </NavLink>
          </li>
          <li className={`${user[0].access !== "admin" && "hidden"}`}>
            <NavLink
              to="/app/settings/support-operations"
              className={`settingsNav ${
                user[0].access !== "admin" && "hidden"
              }`}
            >
              <BsChatSquareDotsFill />
              <span>Support Operations</span>
            </NavLink>
          </li>
          <li className={`${user[0].access !== "admin" && "hidden"}`}>
            <NavLink
              to="/app/settings/automated-reports"
              className={`settingsNav ${
                user[0].access !== "admin" && "hidden"
              }`}
            >
              <BsFileTextFill />
              <span>Automated Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/settings/solutions" className="settingsNav">
              <BsBookHalf />
              <span>Solutions</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SettingsTooltip;
