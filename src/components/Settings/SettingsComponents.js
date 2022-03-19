import React from "react";
import {
  BsSliders,
  BsPeopleFill,
  BsChatSquareDotsFill,
  BsFileTextFill,
  BsBookHalf,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";

const SettingsComponents = () => {
  const member_details = useSelector((state) => state.UserInfo.member_details);

  //Component ======================
  return (
    <div className=" mt-4 h-[40rem]  container w-[90%] md:w-full 2xl:w-[72rem] overflow-hidden grid grid-cols-9 lg:grid-cols-11 gap-4">
      {/** Sidenav ====================================== */}
      <div className="col-span-9 lg:col-span-2 overflow-hidden">
        <div className="dark:bg-slate-900 bg-slate-100 rounded-lg p-4 py-6">
          <h2 className="dark:text-slate-300 text-slate-800 text-xl font-bold">
            Settings
          </h2>
          <ul className="md:space-x-6 lg:space-x-0 justify-center lg:justify-start gap-3 lg:gap-0 lg:space-y-3 mt-4 sidenav grid grid-cols-2 whitespace-nowrap md:flex flex-wrap lg:flex-col">
            <li>
              <NavLink to="/app/settings/account" className="settingsNav">
                <BsSliders />
                <span>Account</span>
              </NavLink>
            </li>
            <li
              className={`${member_details[0].access === "agent" && "hidden"}`}
            >
              <NavLink
                to="/app/settings/team"
                className={`settingsNav ${
                  member_details[0].access === "agent" && "hidden"
                }`}
              >
                <BsPeopleFill />
                <span>Team</span>
              </NavLink>
            </li>
            <li
              className={`${member_details[0].access === "agent" && "hidden"}`}
            >
              <NavLink
                to="/app/settings/support-operations"
                className={`settingsNav ${
                  member_details[0].access === "agent" && "hidden"
                }`}
              >
                <BsChatSquareDotsFill />
                <span>Support Operations</span>
              </NavLink>
            </li>
            <li
              className={`${member_details[0].access === "agent" && "hidden"}`}
            >
              <NavLink
                to="/app/settings/automated-reports"
                className={`settingsNav ${
                  member_details[0].access === "agent" && "hidden"
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
      </div>

      {/**Main Components ============================== */}
      <div className="col-span-9  dark:bg-slate-900 bg-slate-100 rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsComponents;
