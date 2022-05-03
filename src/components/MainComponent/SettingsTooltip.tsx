import { FC } from "react";
import packageJson from "../../../package.json";
import {
  BsSliders,
  BsPeopleFill,
  BsChatSquareDotsFill,
  BsFileTextFill,
  BsBookHalf,
  BsFillDoorOpenFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { signOut, getAuth } from "firebase/auth";
import { updateUserStatus } from "../Data_Fetching/TicketsnUserData";
import { changeLocation, isAuthenticated } from "../../Redux/Slices/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";

const SettingsTooltip: FC = () => {
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  //Component =======================================
  return (
    <>
      <div
        role="tooltip"
        className="bg-transparent p-1 pt-6 absolute right-[-3rem] top-[2rem] hidden group-hover:flex flex-col transition-all duration-500"
      >
        <div className="min-h-[10rem] w-[13rem] z-[999] dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl drop-shadow-2xl rounded p-2 relative  after:content-[''] after:absolute after:right-[3rem] after:top-[-0.8rem] after:h-6 after:w-6 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit flex flex-col items-center">
          <h2 className="dark:text-slate-300 text-slate-800 text-xl font-bold text-left w-full px-2 transition-all duration-500 border-b border-slate-300 dark:border-slate-700 pb-2">
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
                    updateUserStatus(user[0].id, "unavailable");
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
