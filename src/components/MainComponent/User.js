import React, { useState } from "react";
import { FaRegCalendarAlt, FaUserEdit } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsFillDoorOpenFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { isAuthenticated, changeLocation } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { signOut, getAuth } from "firebase/auth";
import Profile from "../authentication/Profile";
import { updateAlert } from "../../store/NotificationsSlice";
import { changeName } from "../Data_Fetching/TicketsnUserData";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const User = () => {
  const [usernameInput, changeInput] = useState("");
  const [settings, setSettingsModal] = useState(false);
  const settingsModalRef = useOnClickOutside(() => {
    setSettingsModal(false);
  });
  const auth = getAuth();
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();

  //Sign Out User =================
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        dispatch(isAuthenticated(false));
        window.localStorage.clear();
        dispatch(changeLocation("Dial n Dine Help-Desk"));
        document.title = "Dial n Dine Help-Desk";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //React Component =======================
  return (
    <div className="h-[8rem] z-0 w-full bg-slate-800 backdrop-blur-lg p-2 flex justify-center">
      <div className="w-[80%] 2xl:w-[72rem] flex justify-between  relative">
        <div className="flex space-x-2 h-full">
          {/** Profile =================== */}
          <Profile />
          {/**User Name & Time ================= */}
          <div className="mt-[.3rem]">
            <h2 className="text-slate-400 text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
              {member_details.length !== undefined && member_details[0].name}
            </h2>
            <h2 className="text-slate-400 border-b border-slate-500 text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
              {member_details.length !== undefined && member_details[0].dept}
            </h2>
            <small className="text-slate-500 text-xs">
              <FaRegCalendarAlt className="inline" />{" "}
              {`${new Date().toDateString()}`}
            </small>
          </div>
        </div>
        {/**Other Settings And Sign Out ================ */}
        <button
          onClick={() => setSettingsModal(true)}
          className="bg-slate-400 h-11 w-11 flex md:hidden justify-center items-center rounded-lg mt-5 text-xl font-bold text-slate-900 hover:text-slate-800 hover:bg-slate-500 transition-all outline-none focus:outline-none"
        >
          <BsThreeDotsVertical className="" />
        </button>
        {/**Small Screens Menu ================== */}
        <div
          ref={settingsModalRef}
          className={`border border-slate-400 backdrop-blur-md md:hidden flex items-center justify-between p-2 shadow-2xl w-[71%] h-20 rounded-xl absolute z-[999] right-[20%] ${
            settings ? "" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              signOutUser();
              setSettingsModal(false);
            }}
            className="px-4 p-1 bg-slate-400 text-slate-900 font-bold text-sm uppercase rounded-lg h-10 w-[13%] items-center justify-center flex outline-none focus:outline-none hover:bg-slate-500 transition-bg duration-300"
          >
            <BsFillDoorOpenFill />
          </button>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              changeName(member_details[0].id, usernameInput);
              dispatch(
                updateAlert({
                  message: "Display Name Changed Successfully",
                  color: "bg-green-200",
                })
              );
            }}
            className="flex space-x-2 justify-center items-center w-[85%] overflow-hidden"
          >
            <div className=" w-full bg-slate-900 rounded-xl relative">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your username..."
                onChange={(e) => changeInput(e.target.value)}
                autoComplete="off"
                className="log_In_Input focus:ring-0 bg-slate-900 placeholder:text-slate-400 w-full pr-8"
              />
              <button
                onClick={() => setSettingsModal(false)}
                type="submit"
                className="px-4 p-1 bg-transparent text-slate-300 absolute top-0 right-0 h-full font-bold text-sm uppercase border-l border-slate-700 outline-none focus:outline-none hover:opacity-80 transition-opaacity duration-300"
              >
                <BsFillCheckCircleFill />
              </button>
            </div>
          </form>
        </div>
        {/**Large Screens Menu ============================= */}
        <div className="hidden md:flex space-x-2 relative">
          <button
            onClick={() => setSettingsModal(settings === false ? true : false)}
            className="px-3 p-1 bg-slate-400 text-slate-900 font-bold text-xl uppercase rounded-lg h-10 mt-5 outline-none focus:outline-none hover:bg-slate-500 transition-bg duration-300"
          >
            <FaUserEdit />
          </button>
          {/**Change name =========== */}
          <div
            ref={settingsModalRef}
            className={`absolute  right-[11rem] z-20 shadow-2xl rounded-lg bg-slate-900 after:content-[""] after:absolute after:top-2/4 after:right-[-1rem] after:mt-[-8px] after:border-[8px] after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-slate-900 ${
              settings ? "scale-100 w-[23rem]" : "scale-0 w-0"
            } transition-scale duration-200 flex space-y-2 p-4 justify-center items-center`}
          >
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                changeName(member_details[0].id, usernameInput);
                dispatch(
                  updateAlert({
                    message: "Display Name Changed Successfully",
                    color: "bg-green-200",
                  })
                );
              }}
              className="flex space-x-2 justify-center items-center overflow-hidden"
            >
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your username..."
                onChange={(e) => changeInput(e.target.value)}
                className="log_In_Input focus:ring-0 input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus textarea:-webkit-autofill textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus select:-webkit-autofill select:-webkit-autofill:hover select:-webkit-autofill:focus placeholder:text-slate-400"
              />
              <button
                onClick={() => setSettingsModal(false)}
                type="submit"
                className="px-4 p-1 bg-blue-600 text-slate-300 font-bold text-sm uppercase rounded-lg h-10 w-[7rem] outline-none focus:outline-none hover:bg-blue-700 transition-bg duration-300"
              >
                Change
              </button>
            </form>
          </div>
          <button
            onClick={() => signOutUser()}
            className="px-4 p-1 bg-slate-400 text-slate-900 font-bold text-sm uppercase rounded-lg h-10 w-[7rem] mt-5 outline-none focus:outline-none hover:bg-slate-500 transition-bg duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
