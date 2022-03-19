import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  getAuth,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { updateAlert } from "../../store/NotificationsSlice";
import { changeLocation, isAuthenticated } from "../../store/UserSlice";
import {
  BsEnvelope,
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsFillPersonFill,
  BsBuilding,
  BsFillKeyFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import {
  updateUserDetails,
  updateUserStatus,
} from "../Data_Fetching/TicketsnUserData";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
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
  let photoUrl = "";
  let emailStatus = false;
  if (user !== null) {
    photoUrl = user.photoURL;
    emailStatus = user.emailVerified;
  }

  //Sign Out User =================
  const signOutUser = () => {
    updateUserStatus(member_details[0].id, "unavailable");
    setTimeout(() => {
      signOut(auth).then(() => {
        dispatch(isAuthenticated(false));
        window.localStorage.clear();
        dispatch(changeLocation("Dial n Dine Help-Desk"));
        document.title = "Dial n Dine Help-Desk";
        navigate("/logIn");
      });
    }, 1000);
  };

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
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 p-1">
      {/**Profile Datils ======================= */}
      <div className="col-span-1 lg:border-r dark:border-slate-800 border-slate-300 flex flex-col p-6 space-y-2">
        <div
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            )`,
          }}
          className="w-full h-[10rem] rounded-xl bg-slate-800 pl-10 bg-no-repeat bg-center  backdrop-hue-rotate-60"
        >
          <div className="h-20 w-20 mt-[8rem] dark:bg-slate-700 bg-slate-200 border-2 border-slate-400 p-[2px] rounded-xl overflow-hidden">
            <img
              src={photoUrl}
              alt="profile"
              className="object-cover object-center rounded-lg h-full w-full"
            />
          </div>
        </div>
        {/**User Name & Time ================= */}
        <div className="mt-[.25rem] w-full pr-10">
          <h2 className="dark:text-slate-300 text-slate-800 text-right text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].name}
          </h2>
          <h3 className="dark:text-slate-400 text-slate-700 text-right text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].dept}
          </h3>
        </div>
        {/**Bio ====================== */}
        <div className=" mt-[5rem] border border-slate-300 dark:border-slate-800 p-4 w-full min-h-36 rounded-lg leading-12">
          <h6 className="dark:text-slate-300 text-slate-800 text-base font-bold tracking-wide">
            About Me
          </h6>
          <p className="dark:text-slate-400 text-slate-700 text-xs capitalize font-medium flex items-center justify-center space-x-1 overflow-hidden mt-2">
            {member_details.length !== undefined && member_details[0].bio}
          </p>
          <h6 className="dark:text-slate-300 text-slate-800 text-base font-bold tracking-wide mt-4">
            Contact Info
          </h6>
          <h4 className="dark:text-slate-400 text-slate-700 text-xs lowercase font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            <BsEnvelope className="inline" />{" "}
            {member_details.length !== undefined && member_details[0].email}
          </h4>
          {emailStatus && (
            <h5 className="dark:text-slate-400 text-slate-700 text-xs capitalize font-medium whitespace-nowrap text-ellipsis flex items-center space-x-1 overflow-hidden">
              <BsFillPatchCheckFill className="inline text-green-600" />{" "}
              <span>Your email is verified.</span>
            </h5>
          )}
          {!emailStatus && (
            <h5 className="dark:text-slate-400 text-slate-700 text-xs font-medium whitespace-nowrap text-ellipsis flex items-center justify-center space-x-1 overflow-hidden">
              <BsFillPatchExclamationFill className="inline text-red-600" />{" "}
              <span>
                Please verify your email,{" "}
                <span
                  onClick={() => {
                    if (!auth.currentUser.user.emailVerified) {
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
            </h5>
          )}
        </div>
        <button
          onClick={() => {
            signOutUser();
          }}
          className="dark:bg-red-800 bg-red-600 px-4 w-[9rem] p-2 text-slate-300 font-semibold text-xs rounded-md hover:opacity-80 outline-none focus:outline-none uppercase flex space-x-1 items-center justify-center"
        >
          <BsBoxArrowRight /> <span>Sign Out</span>
        </button>
      </div>

      {/**Update Details =========================== */}
      <div className="col-span-1 p-6">
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow resize-none"
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
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
        <button className="dark:bg-red-800 bg-red-600 px-4 w-[9rem] mt-4 p-2 text-slate-300 font-semibold text-xs rounded-md hover:opacity-80 outline-none focus:outline-none uppercase flex space-x-1 items-center justify-center">
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default Account;
