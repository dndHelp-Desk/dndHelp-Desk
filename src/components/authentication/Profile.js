import { useEffect, useState } from "react";
import { useAuth, upload } from "./Firebase";
import {
  BsCameraFill,
  BsBoxArrowUp,
  BsCheck,
  BsStopFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store/NotificationsSlice";
import {
  updateUserStatus,
  updateProfileUrl,
  updateUID,
} from "../Data_Fetching/TicketsnUserData";
import defaultProfile from "./../../default.webp";

const Profile = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [change, setNewChange] = useState(true);
  const [showChange, setChange] = useState(false);
  const [showChangeIcon, setChangeIcon] = useState("scale-0");
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const [photoURL, setPhotoURL] = useState(defaultProfile);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    setChange(true);
  };

  //Submit profile to the DB =========
  const handleSubmit = (e) => {
    e.preventDefault(e);
    photo && upload(photo, currentUser);
    setNewChange(false);
    setChange(false);
  };

  //Apply Changes to the Profile =========
  change === false &&
    setTimeout(() => {
      setPhotoURL(currentUser.photoURL);
      setNewChange(true);
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Profile Changed Successfully",
            color: "bg-green-200",
          },
        ])
      );
    }, 3000);

  useEffect(() => {
    if (member_details.length >=1 && member_details[0].id !== false && currentUser) {
      currentUser.photoURL !== null && setPhotoURL(currentUser.photoURL);
      member_details.length >=1 && member_details[0].photoUrl &&
        currentUser.photoURL !== null &&
        updateProfileUrl(member_details.length >=1 && member_details[0].id, currentUser.photoURL);
      !member_details.length >=1 && member_details[0].uid &&
        updateUID(member_details.length >=1 && member_details[0].id, currentUser.uid);
    }
  }, [currentUser, member_details]);

  return (
    <>
      <form
        id="Profile_Details"
        className="flex flex-col relative group"
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          className={`text-xs ${
            showChange ? "" : "hidden"
          } font-bold text-base tracking-wide top-1 right-[-2.6rem]  absolute bg-slate-500 p-2 rounded-lg flex flex-col items-center justify-center text-slate-200 cursor-pointer transition-scale duration-300`}
          type="submit"
        >
          <BsBoxArrowUp />
        </button>
        <div className="h-10 flex justify-center relative">
          <div
            onMouseOver={() => setChangeIcon("scale-100")}
            onMouseLeave={() => setChangeIcon("scale-0")}
            className="h-10 w-10 border-2 p-[2px] dark:border-slate-300 border-slate-900 rounded-xl flex justify-center items-center cursor-pointer"
          >
            <img
              className="rounded-lg bg-slate-500 h-full w-full object-cover object-center border dark:border-slate-400 border-slate-400"
              src={photoURL}
              alt="profile"
            />
            <label
              className={`absolute bg-[#1c105283] h-10 w-10 rounded-xl flex flex-col items-center justify-center text-slate-200 cursor-pointer transition-scale duration-300 ${showChangeIcon}`}
              htmlFor="profile"
            >
              <BsCameraFill />
              <input
                className="hidden"
                name="profile"
                id="profile"
                type="file"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
          <span
            className={`absolute h-2.5 w-2.5 rounded-full border dark:border-slate-900 border-slate-100  ${
              member_details.length >= 1 &&
              member_details[0].status === "available"
                ? "bg-green-500"
                : member_details.length >= 1 &&
                  member_details[0].status === "busy"
                ? "bg-yellow-500"
                : "bg-red-500"
            } right-[-1px] top-[-2px]`}
          ></span>

          {/** Change Agent Online Stutus ============*/}
          <div 
              role="tooltip" className="bg-transparent p-1 pt-4 absolute right-[-0.3rem] top-[2.3rem] hidden group-hover:flex flex-col">
            <div
              className="p-4 z-[999] dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 flex flex-col items-center pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded-lg after:content-[''] after:absolute after:right-[1rem] after:top-[0.5rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit"
            >
              <div className="pb-2">
                <h3 className="dark:text-slate-300 text-slate-900 text-sm text-center capitalize font-semibold">
                  {member_details.length >= 1 && member_details[0].name}
                </h3>
                <h4 className="dark:text-slate-400 text-slate-700 text-xs text-center capitalize font-semibold">
                  {member_details.length >= 1 && member_details[0].dept}
                </h4>
              </div>
              <ul className="w-full capitalize">
                <li
                  onClick={() => {
                    updateUserStatus(
                      member_details.length >= 1 && member_details[0].id,
                      "available"
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                          },
                        ])
                      );
                    }, 3000);
                  }}
                  className="h-8 border-b border-t hover:opacity-80 dark:border-slate-600 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-green-500 cursor-pointer"
                >
                  <span className="flex items-center space-x-1">
                    <BsStopFill /> <span>available</span>
                  </span>
                  {member_details.length >= 1 &&
                    member_details[0].status === "available" && (
                      <BsCheck className="text-lg" />
                    )}
                </li>
                <li
                  onClick={() => {
                    updateUserStatus(
                      member_details.length >= 1 && member_details[0].id,
                      "busy"
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                          },
                        ])
                      );
                    }, 3000);
                  }}
                  className="h-8 border-b hover:opacity-80 dark:border-slate-600 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-yellow-500 cursor-pointer"
                >
                  <span className="flex items-center space-x-1">
                    <BsStopFill /> <span>Busy</span>
                  </span>
                  {member_details.length >= 1 &&
                    member_details[0].status === "busy" && (
                      <BsCheck className="text-lg" />
                    )}
                </li>
                <li
                  onClick={() => {
                    updateUserStatus(
                      member_details.length >= 1 && member_details[0].id,
                      "unavailable"
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                          },
                        ])
                      );
                    }, 3000);
                  }}
                  className="h-8 border-b hover:opacity-80 dark:border-slate-600 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-red-500 cursor-pointer"
                >
                  <span className="flex items-center space-x-1">
                    <BsStopFill /> <span>Unavailable</span>
                  </span>
                  {member_details.length >= 1 &&
                    member_details[0].status === "unavailable" && (
                      <BsCheck className="text-lg" />
                    )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
