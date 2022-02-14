import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { updateAlert } from "../../store/NotificationsSlice";
import {
  BsEnvelope,
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsFillPersonFill,
  BsBuilding,
} from "react-icons/bs";

const Account = () => {
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  let photoUrl = "";
  let emailStatus = false;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    photoUrl = user.photoURL;
    emailStatus = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  console.log(emailStatus);
  //Component =========================
  return (
    <div className="h-full w-full grid grid-cols-2 p-1">
      {/**Profile Datils ======================= */}
      <div className="col-span-1 border-r dark:border-slate-800 border-slate-300 flex flex-col items-center p-6 space-y-2">
        <div className="h-20 w-20 bg-slate-700 rounded-xl overflow-hidden">
          <img
            src={photoUrl}
            alt="profile"
            className="object-cover object-center h-full w-full"
          />
        </div>
        {/**User Name & Time ================= */}
        <div className="mt-[.3rem] space-y-1">
          <h2 className="dark:text-slate-400 text-slate-500 text-center text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].name}
          </h2>
          <h3 className="dark:text-slate-400 text-slate-500 text-center text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].dept}
          </h3>
          <h4 className="dark:text-slate-400 text-slate-500 text-center text-xs lowercase font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            <BsEnvelope className="inline" />{" "}
            {member_details.length !== undefined && member_details[0].email}
          </h4>
          {emailStatus && (
            <h5 className="dark:text-slate-400 text-slate-500 text-center text-xs capitalize font-medium whitespace-nowrap text-ellipsis flex items-center justify-center space-x-1 overflow-hidden">
              <BsFillPatchCheckFill className="inline text-green-600" />{" "}
              <span>Your email is verified.</span>
            </h5>
          )}
          {!emailStatus && (
            <h5 className="dark:text-slate-400 text-slate-500 text-center text-xs font-medium whitespace-nowrap text-ellipsis flex items-center justify-center space-x-1 overflow-hidden">
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
                              message:
                                "Check Your Email To Verify The Account.",
                              color: "bg-green-200",
                            })
                          );
                        })
                        .catch((error) => {
                          dispatch(
                            updateAlert({
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
      </div>

      {/**Update Details =========================== */}
      <div className="col-span-1 p-6">
        <h2 className="dark:text-slate-400 text-slate-500 text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          Edit Information
        </h2>
        <form action="" className="mt-2 space-y-3">
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Fullname ..."
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
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-20 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <textarea
              type="text"
              name="department"
              id="department"
              autoComplete="nope"
              placeholder="About / Bio ..."
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
