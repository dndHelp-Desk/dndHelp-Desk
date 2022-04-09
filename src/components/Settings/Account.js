import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuth,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { updateAlert } from "../../store/NotificationsSlice";
import {
  BsEnvelope,
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsFillPersonFill,
  BsBuilding,
  BsFillKeyFill,
} from "react-icons/bs";
import defaultProfile from "./../../default.webp";
import { updateUserDetails } from "../Data_Fetching/TicketsnUserData";

const Account = () => {
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const dispatch = useDispatch();
  const [inputValues, setValues] = useState({
    name: "",
    dept: "",
    password: "",
    old_password: "",
    bio: "",
  });
  const auth = getAuth();
  const user = auth.currentUser;
  let photoUrl = defaultProfile;
  let emailStatus = false;
  if (user !== null) {
    user.photoURL && (photoUrl = user.photoURL);
    emailStatus = user.emailVerified;
  }

  //Set New Password ===========================
  const newPassword = (e) => {
    e.preventDefault();
    let credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      inputValues.old_password
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, inputValues.password)
          .then(() => {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: "Password Update Successfully",
                  color: "bg-green-200",
                },
              ])
            );
          })
          .catch((error) => {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: error.message,
                  color: "bg-red-200",
                },
              ])
            );
          });
      })
      .catch((error) => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: error.message,
              color: "bg-red-200",
            },
          ])
        );
      });
    setValues({ ...inputValues, password: "", old_password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(
      member_details[0].id,
      inputValues.name,
      inputValues.dept,
      inputValues.bio
    );
    setValues({ ...inputValues, name: "", dept: "", bio: "" });
  };

  //Component =========================
  return (
    <div className="w-full">
      {/**Profile Datils ======================= */}
      <div className="w-full h-[15rem] rounded-lg dark:bg-slate-800 bg-white flex flex-col relative overflow-hidden">
        <div
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1544&q=80"
            )`,
          }}
          className="w-full h-[70%] bg-slate-800 pl-10 bg-no-repeat bg-center  backdrop-hue-rotate-60"
        ></div>
        <div className="h-28 w-28 mt-[8rem] dark:bg-slate-700 bg-slate-200 border-2 border-slate-300 p-[2px] rounded-full overflow-hidden absolute left-8 bottom-[10%]">
          <img
            src={
              member_details[0].photoUrl !== null &&
              member_details[0].photoUrl !== ""
                ? member_details[0].photoUrl
                : photoUrl
            }
            alt="profile"
            className="object-cover object-center rounded-full h-full w-full"
          />
          <p className="absolute ">pp</p>
        </div>
        {/**User Name & Time ================= */}
        <div className="mt-[.25rem] w-full pr-10">
          <h1 className="dark:text-slate-300 text-slate-800 text-right text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].name}
          </h1>
          <h2 className="dark:text-slate-400 text-slate-700 text-right text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].dept}
          </h2>
        </div>
      </div>
      <div className="flex flex-col py-4 space-y-2">
        {/**Bio ====================== */}
        <div className=" mt-[1rem] border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 w-full h-[15rem] rounded-lg leading-12 overflow-hidden">
          <h3 className="dark:text-slate-300 text-slate-800 text-base font-bold tracking-wide">
            About Me
          </h3>
          <p className="dark:text-slate-400 text-slate-700 text-xs capitalize font-medium flex items-center justify-center space-x-1 overflow-hidden overflow-y-scroll h-[5rem] p-2 mt-2">
            {member_details.length !== undefined
              ? member_details[0].bio
              : "Write some details about yourself here ... Like your ambitionss, aspirations, profession and so on , might be useful for your collegues 😉"}
          </p>
          <h4 className="dark:text-slate-300 text-slate-800 text-base font-bold tracking-wide mt-4">
            Contact Info
          </h4>
          <p className="dark:text-slate-400 text-slate-700 text-sm lowercase font-medium whitespace-nowrap text-ellipsis overflow-hidden px-2">
            <BsEnvelope className="inline" />{" "}
            {member_details.length !== undefined && member_details[0].email}
          </p>
          {emailStatus && (
            <p className="dark:text-slate-400 text-slate-700 text-sm capitalize font-medium whitespace-nowrap text-ellipsis flex items-center space-x-1 overflow-hidden px-2">
              <BsFillPatchCheckFill className="inline text-green-600" />{" "}
              <span>Your email is verified.</span>
            </p>
          )}
          {!emailStatus && (
            <button className="dark:text-slate-400 text-slate-700 text-xs font-medium whitespace-nowrap text-ellipsis flex items-center space-x-1 overflow-hidden outline-none focus:outline-none">
              <BsFillPatchExclamationFill className="inline text-red-600" />{" "}
              <span>
                Please verify your email,{" "}
                <span
                  onClick={() => {
                    if (!emailStatus) {
                      sendEmailVerification(auth.currentUser)
                        .then(() => {
                          dispatch(
                            updateAlert({
                              ...alerts,
                              message:
                                "Check Your Email To Verify The Account.",
                              color: "bg-green-200",
                            })
                          );
                        })
                        .catch((error) => {
                          dispatch(
                            updateAlert({
                              ...alerts,
                              message: error.message,
                              color: "bg-red-200",
                            })
                          );
                        });
                    }
                  }}
                  className="text-blue-500 underline"
                >
                  click here to get the email.
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/**Update Details =========================== */}
      <div className="col-span-1 py-4">
        <h2 className="dark:text-slate-300 text-slate-800 text-sm font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          Edit Information
        </h2>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="mt-2 space-y-3 pb-5 border-b dark:border-slate-800 border-slate-300"
        >
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Fullname ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, name: e.target.value })
              }
              value={inputValues.name}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-300 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white"
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="department"
              id="department"
              autoComplete="nope"
              placeholder="Department ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, dept: e.target.value })
              }
              value={inputValues.dept}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-300 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white"
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-20 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <textarea
              type="text"
              name="bio"
              id="bio"
              autoComplete="nope"
              placeholder="About / Bio ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, bio: e.target.value })
              }
              value={inputValues.bio}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-300 outline-none focus:outline-none text-sm px-4 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 px-4 p-2 text-slate-300 font-semibold text-sm rounded-md hover:opacity-80 outline-none focus:outline-none"
          >
            Save Changes
          </button>
        </form>

        {/**Change password =============================== */}
        <h2 className="dark:text-slate-300 mt-5 text-slate-800 text-sm font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          Change Password
        </h2>
        <form
          onSubmit={(e) => newPassword(e)}
          className="mt-2 space-y-3 pb-5 border-b dark:border-slate-800 border-slate-300"
        >
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="old_password"
              id="old_password"
              autoComplete="off"
              placeholder="Old Password ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, old_password: e.target.value })
              }
              value={inputValues.old_password}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-300 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white"
            />
            <BsFillKeyFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="New Password ..."
              required
              minLength="6"
              onChange={(e) =>
                setValues({ ...inputValues, password: e.target.value })
              }
              value={inputValues.password}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-300 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white"
            />
            <BsFillKeyFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <button
            type="submit"
            className="bg-blue-700 px-4 p-2 text-slate-300 font-semibold text-sm rounded-md hover:opacity-80 outline-none focus:outline-none"
          >
            Change Password
          </button>
        </form>

        {/**Delete Account ================================ */}
        <h2 className="dark:text-slate-300 text-slate-800 text-sm font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden mt-4">
          Danger Zone
        </h2>
        <button className=" w-[9rem] px-4 p-2 mt-4 dark:bg-red-800 bg-red-600 text-slate-300 font-semibold text-xs rounded-md hover:opacity-80 outline-none focus:outline-none uppercase flex space-x-1 items-center justify-center">
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default Account;
