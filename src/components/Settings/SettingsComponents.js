import React from "react";
import {
  BsSliders,
  BsPeopleFill,
  BsChatSquareDotsFill,
  BsFileTextFill,
  BsBookHalf,
} from "react-icons/bs";
import { Outlet, NavLink } from "react-router-dom";

const SettingsComponents = () => {

  //Component ======================
  return (
    <div className=" mt-4 min-h-[40rem] container w-[90%] md:w-full 2xl:w-[72rem] overflow-hidden grid grid-cols-9 lg:grid-cols-11 gap-4">
      {/** Sidenav ====================================== */}
      <div className="col-span-9 lg:col-span-2 overflow-hidden">
        <div className="dark:bg-slate-900 bg-slate-100 rounded-lg p-4 py-10">
          <h2 className="dark:text-slate-400 text-slate-600 text-xl font-bold border-b dark:border-slate-600 border-slate-400">
            Settings
          </h2>
          <ul className="space-x-6 lg:space-x-0 justify-center lg:justify-start gap-4 lg:gap-0 lg:space-y-3 mt-10 sidenav flex flex-wrap lg:flex-col">
            <li>
              <NavLink to="/settings/account" className="settingsNav">
                <BsSliders />
                <span>Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings/team" className="settingsNav">
                <BsPeopleFill />
                <span>Team</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/support-operations"
                className="settingsNav"
              >
                <BsChatSquareDotsFill />
                <span>Support Operations</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings/automated-reports" className="settingsNav">
                <BsFileTextFill />
                <span>Automated Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings/solutions" className="settingsNav">
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
