import React from "react";
import packageJson from "./../../../package.json";
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
        className="bg-transparent p-1 pt-6 absolute right-[-2.3rem] top-[2.2rem] hidden group-hover:flex flex-col"
      >
        <div className="min-h-[10rem] w-[13rem] z-[999] dark:bg-slate-700 bg-white border dark:border-slate-700 border-slate-300 pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded-lg p-2 relative  after:content-[''] after:absolute after:right-[2.5rem] after:top-[-0.8rem] after:h-6 after:w-6 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit flex flex-col items-center">
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
            <li
              className={`${
                user.length >= 1 && user[0].access !== "admin" && "hidden"
              }`}
            >
              <NavLink
                to="/app/settings/team"
                className={`settingsNav ${
                  user.length >= 1 && user[0].access !== "admin" && "hidden"
                }`}
              >
                <BsPeopleFill />
                <span>Team</span>
              </NavLink>
            </li>
            <li
              className={`${
                user.length >= 1 && user[0].access !== "admin" && "hidden"
              }`}
            >
              <NavLink
                to="/app/settings/support-operations"
                className={`settingsNav ${
                  user.length >= 1 && user[0].access !== "admin" && "hidden"
                }`}
              >
                <BsChatSquareDotsFill />
                <span>Support Operations</span>
              </NavLink>
            </li>
            <li
              className={`${
                user.length >= 1 && user[0].access !== "admin" && "hidden"
              }`}
            >
              <NavLink
                to="/app/settings/automated-reports"
                className={`settingsNav ${
                  user.length >= 1 && user[0].access !== "admin" && "hidden"
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
            <small className="text-slate-500 text-xs font-light italic">
              version: {packageJson.version}
            </small>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingsTooltip;
