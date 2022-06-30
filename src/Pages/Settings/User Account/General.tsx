import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuth,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import {
  BsEnvelope,
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
  BsFillPersonFill,
  BsFillKeyFill,
} from "react-icons/bs";
import { updateUserDetails } from "../../../Adapters/Data_Fetching/TicketsnUserData";
import { AppDispatch, RootState } from "../../../Redux/store";

const General: FC = () => {
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const dispatch: AppDispatch = useDispatch();
  const [inputValues, setValues] = useState<any>({
    name: "",
    password: "",
    old_password: "",
    bio: "",
  });
  const auth: any = getAuth();
  const user: any = auth.currentUser;
  let emailStatus = false;
  if (user !== null) {
    emailStatus = user.emailVerified;
  }

  //Set New Password ===========================
  const newPassword = (e: React.SyntheticEvent) => {
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
                  id: new Date().getTime(),
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
                  id: new Date().getTime(),
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
              id: new Date().getTime(),
            },
          ])
        );
      });
    setValues({ ...inputValues, password: "", old_password: "" });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateUserDetails(member_details[0].id, inputValues.name, inputValues.bio);
    setValues({ ...inputValues, name: "", dept: "", bio: "" });
  };

  //Component ===================================
  return (
    <div className="col-span-4 md:col-span-3">
      <h1 className="text-xl font-bold font-sans text-slate-800 dark:text-slate-300">
        Personal Account
      </h1>
      <p className="mb-4 text-sm font-medium font-sans text-slate-700 dark:text-slate-400">
        Your personal information
      </p>
      {/**Profile Datils ======================= */}
      <div className="w-full h-[8rem] rounded dark:bg-slate-800 bg-white flex items-center relative overflow-hidden">
        <div className="h-full rounded flex flex-col justify-center space-y-1 p-4">
          {/**User Name & Time ================= */}
          <h1 className="dark:text-slate-300 text-slate-800 text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].name}
          </h1>
          <h2 className="dark:text-slate-400 text-slate-700 text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {member_details.length !== undefined && member_details[0].dept}
          </h2>
          <p className="dark:text-slate-400 text-slate-700 text-sm lowercase font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            <BsEnvelope className="inline" />{" "}
            {member_details.length !== undefined && member_details[0].email}
          </p>
          {emailStatus && (
            <p className="dark:text-slate-400 text-slate-700 text-sm capitalize font-medium whitespace-nowrap text-ellipsis flex items-center space-x-1 overflow-hidden">
              <BsFillPatchCheckFill className="inline text-green-600" />{" "}
              <span>Your email is verified.</span>
            </p>
          )}
          {!emailStatus && (
            <button className="dark:text-slate-400 text-slate-700 text-xs font-medium whitespace-nowrap text-ellipsis flex items-center space-x-1 overflow-hidden outline-none focus:outline-none focus:ring-0 focus:border-0">
              <BsFillPatchExclamationFill className="inline text-red-600" />{" "}
              <span>
                Please verify your email,{" "}
                <span
                  onClick={() => {
                    if (!emailStatus) {
                      sendEmailVerification(auth.currentUser)
                        .then(() => {
                          dispatch(
                            updateAlert([
                              ...alerts,
                              {
                                message:
                                  "Check Your Email To Verify The Account.",
                                color: "bg-green-200",
                                id: new Date().getTime(),
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
                                id: new Date().getTime(),
                              },
                            ])
                          );
                        });
                    }
                  }}
                  className="text-indigo-500 underline"
                >
                  click here to get the verification email.
                </span>
              </span>
            </button>
          )}
        </div>
        {/**Profile photo =================== */}
        <div className="h-20 w-20 bg-slate-400 rounded-full absolute right-4 overflow-hidden">
          <img
            src={auth?.currentUser?.photoURL}
            alt="profile"
            className="h-full w-full rounded-full object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col py-4 space-y-2">
        {/**Bio ====================== */}
        <div className="border-0 bg-white dark:bg-slate-800 p-4 w-full h-[10rem] rounded leading-12 overflow-hidden">
          <h3 className="dark:text-slate-300 text-slate-800 text-xs font-bold font-sans uppercase tracking-wide">
            Bio
          </h3>
          <p className="dark:text-slate-400 text-slate-700 text-xs capitalize font-medium flex space-x-1 overflow-hidden overflow-y-scroll h-[6rem] p-2 mt-2 border-l-2 dark:border-slate-700 border-slate-300">
            {member_details.length !== undefined
              ? member_details[0].bio
              : "Write some details about yourself here ... Like your ambitionss, aspirations, profession and so on , might be useful for your collegues 😉"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 space-x-4">
        <div className="w-2/5 h-[2px] bg-white dark:bg-slate-700"></div>
        <h3 className="w-1/5 text-sm font-semibold font-sans text-slate-700 dark:text-slate-400 text-center">
          Update Details
        </h3>
        <div className="w-2/5 h-[2px] bg-white dark:bg-slate-700"></div>
      </div>
      {/**Update Details =========================== */}
      <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 bg-white dark:bg-slate-800 p-4 h-[20rem] rounded">
          <h2 className="my-4 dark:text-slate-300 text-slate-800 text-xs font-sans font-bold uppercase whitespace-nowrap text-ellipsis overflow-hidden">
            Edit Information
          </h2>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="mt-2 space-y-3 pb-5"
          >
            <div className="h-11 w-full min-w-[15rem] rounded relative">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="nope"
                placeholder="Full Name ..."
                required
                onChange={(e) =>
                  setValues({ ...inputValues, name: e.target.value })
                }
                value={inputValues.name}
                className="bg-transparent w-full h-full rounded outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-11 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-50 border dark:border-slate-700 border-slate-300 focus:border-slate-600 dark:focus:border-slate-600"
              />
              <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
            </div>
            <div className="h-20 w-full min-w-[15rem] rounded relative">
              <textarea
                name="bio"
                id="bio"
                autoComplete="nope"
                placeholder="About | Bio ..."
                required
                onChange={(e) =>
                  setValues({ ...inputValues, bio: e.target.value })
                }
                value={inputValues.bio}
                className="bg-transparent w-full h-full resize-none rounded outline-none focus:outline-none focus:ring-0 text-sm px-4 placeholder:text-slate-500 text-slate-500  dark:bg-slate-800 bg-slate-50 border dark:border-slate-700 border-slate-300 focus:border-slate-600 dark:focus:border-slate-600"
              />
            </div>
            <button
              type="submit"
              className="dark:bg-indigo-700 bg-slate-800 px-4 p-2 text-slate-50 font-medium text-sm round-smed hover:opacity-80 outline-none focus:outline-none focus:ring-0 focus:border-0"
            >
              Save Changes
            </button>
          </form>
        </div>
        {/**Change password =============================== */}
        <div className="col-span-1 bg-white dark:bg-slate-800 p-4 rounded h-[20rem]">
          <h2 className="my-4 dark:text-slate-300 text-slate-800 text-xs font-sans font-bold uppercase whitespace-nowrap text-ellipsis overflow-hidden">
            Change Password
          </h2>
          <form
            onSubmit={(e) => newPassword(e)}
            className="mt-2 space-y-3 pb-5"
          >
            <div className="h-11 w-full min-w-[15rem] rounded relative">
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
                className="bg-transparent w-full h-full rounded outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-11 placeholder:text-slate-500 text-slate-500  dark:bg-slate-800 bg-slate-50 border dark:border-slate-700 border-slate-300 focus:border-slate-600 dark:focus:border-slate-600"
              />
              <BsFillKeyFill className="absolute text-slate-500 text-lg top-3 left-4" />
            </div>
            <div className="h-11 w-full min-w-[15rem] rounded relative">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                placeholder="New Password ..."
                required
                minLength={6}
                onChange={(e) =>
                  setValues({ ...inputValues, password: e.target.value })
                }
                value={inputValues.password}
                className="bg-transparent w-full h-full rounded outline-none focus:outline-none focus:ring-0  text-sm px-4 pl-11 placeholder:text-slate-500 text-slate-500  dark:bg-slate-800 bg-slate-50 border dark:border-slate-700 border-slate-300 focus:border-slate-600 dark:focus:border-slate-600"
              />
              <BsFillKeyFill className="absolute text-slate-500 text-lg top-3 left-4" />
            </div>
            <button
              type="submit"
              className="dark:bg-indigo-700 bg-slate-800 px-4 p-2 text-slate-50 font-medium text-sm round-smed hover:opacity-80 outline-none focus:outline-none focus:ring-0 focus:border-0"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default General;
