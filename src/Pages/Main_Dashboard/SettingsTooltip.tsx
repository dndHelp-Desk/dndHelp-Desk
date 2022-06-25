import { FC } from "react";
import packageJson from "../../../package.json";
import {
  BsFillGearFill,
  BsPeopleFill,
  BsChatSquareDotsFill,
  BsFileTextFill,
  BsBookHalf,
  BsFillDoorOpenFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { HiOutlineSun, HiOutlineSparkles } from "react-icons/hi";
import { signOut, getAuth } from "firebase/auth";
import { changeLocation, isAuthenticated } from "../../Redux/Slices/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";

interface Props {
  theme: string | null;
  changeTheme: any;
}

const SettingsTooltip: FC<Props> = ({ theme, changeTheme }) => {
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  //Component =======================================
  return (
    <>
      <div
        role="tooltip"
        className="bg-transparent p-1 absolute left-10 bottom-[-0.3rem] hidden group-hover:flex flex-col transition-all duration-500"
      >
        <div className="min-h-[10rem] w-[16rem] z-[999] dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl drop-shadow-2xl rounded p-2 relative flex flex-col">
          <h2 className="dark:text-slate-300 text-slate-800 text-xl font-bold text-left w-full transition-all duration-500 pb-2">
            Settings
          </h2>

          {/**Change Theme =========================== */}
          <div className="mb-2 h-9 w-36 p-[0.2rem] rounded dark:bg-[#0f172a91] bg-slate-100 border border-slate-300 dark:border-slate-700 overflow-hidden relative">
            <div className="w-full h-full flex">
              <div
                className={`h-full w-2/4 bg-white dark:bg-[#33415569] border dark:border-slate-600 border-slate-300 rounded-sm shadow transition-all duration-500 ${
                  theme === "dark" && "translate-x-[100%] "
                }`}
              ></div>
            </div>
            <div className="flex justify-between absolute top-1 left-1 right-1 bottom-1">
              <button
                onClick={() => {
                  dispatch(changeTheme("light"));
                  window.localStorage.setItem("theme", JSON.stringify("light"));
                }}
                className="flex-[1] bg-transparent outline-none focus:outline-none flex items-center justify-center space-x-2 text-xs text-slate-900 dark:text-slate-300 font-medium"
              >
                <HiOutlineSun className="text-base" />
                <span>Light</span>
              </button>
              <button
                onClick={() => {
                  dispatch(changeTheme("dark"));
                  window.localStorage.setItem("theme", JSON.stringify("dark"));
                }}
                className="flex-[1] bg-tranparent outline-none focus:outline-none flex items-center justify-center space-x-2 text-xs text-slate-900 dark:text-slate-300 font-medium"
              >
                <HiOutlineSparkles className="text-base" />
                <span>Dark</span>
              </button>
            </div>
          </div>
          <hr className=" border-b border-slate-300 dark:border-slate-700 w-full" />

          {/**Menu List =========================== */}
          <ul className="flex w-full px-2 space-y-4 mt-4 flex-col">
            <li>
              <NavLink
                to="/app/settings/account/general"
                className="settingsNav"
              >
                <BsFillGearFill />
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
            <li>
              <NavLink to="/app/settings/solutions" className="settingsNav">
                <BsFillCreditCard2BackFill />
                <span>Billing</span>
              </NavLink>
            </li>
            <hr className="border-slate-300 dark:border-slate-700" />
            <li>
              <button
                onClick={() => {
                  const logOut = async () => {
                    signOut(auth).then(() => {
                      dispatch(isAuthenticated(false));
                      window.localStorage.clear();
                      dispatch(changeLocation("dndHelp-Desk"));
                      document.title = "dndHelp-Desk";
                      navigate("/logIn");
                    });
                  };

                  logOut();
                }}
                className="py-2 px-4 w-full rounded outline-none focus:outline-none bg-red-600 text-slate-300 text-sm font-semibold flex justify-center items-center space-x-1 hover:opacity-80"
              >
                <BsFillDoorOpenFill />
                <span>Sign Out</span>
              </button>
            </li>
            <small className="text-slate-500 font-semibold text-xs italic">
              Version: {packageJson.version}
            </small>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingsTooltip;
