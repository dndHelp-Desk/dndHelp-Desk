import { useEffect, useState } from "react";
import { useAuth, upload } from "./Firebase";
import { BsCameraFill, BsBoxArrowUp, BsCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store/NotificationsSlice";
import {
  updateUserStatus,
  updateProfileUrl,
} from "../Data_Fetching/TicketsnUserData";

const Profile = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [change, setNewChange] = useState(true);
  const [showChange, setChange] = useState(false);
  const [showChangeIcon, setChangeIcon] = useState("scale-0");
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const [photoURL, setPhotoURL] = useState(
    "https://images.unsplash.com/photo-1613632749262-2fbd97f3a867?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  );
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
        updateAlert({
          message: "Profile Changed Successfully",
          color: "bg-green-200",
        })
      );
    }, 3000);

  useEffect(() => {
    if (member_details[0].id !== false && currentUser) {
      setPhotoURL(currentUser.photoURL);
      currentUser.photoURL !== member_details[0].photoUrl &&
        updateProfileUrl(member_details[0].id, currentUser.photoURL);
    }
  }, [currentUser, member_details]);

  return (
    <>
      <form
        id="Profile_Details"
        className="flex flex-col relative"
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
            className="h-10 w-10 rounded-xl flex justify-center items-center cursor-pointer"
          >
            <img
              className="rounded-xl bg-slate-500 h-full w-full object-cover object-center"
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
              member_details.length !== undefined &&
              member_details[0].status === "available"
                ? "bg-green-500"
                : member_details[0].status === "busy"
                ? "bg-yellow-500"
                : "bg-red-500"
            } right-[-2px] top-[-2px]`}
          ></span>

          {/** Change Agent Online Stutus ============*/}
          <div className="hoverProfile_Details p-3 absolute w-[12rem] overflow-hidden dark:bg-slate-600 bg-slate-500 hidden flex-col justify-between space-y-4 rounded-xl shadow-2xl  top-14 right-[-0.5rem] after:content-[''] after:fixed after:top-[3.7rem] after:right-[1rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-600 after:border-b-slate-500 after:border-l-transparent">
            <div className="pb-2">
              <small
                className={`text-xs text-center capitalize font-semibold flex items-center justify-center ${
                  member_details[0].status === "available"
                    ? "text-green-500"
                    : member_details[0].status === "unavailable"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                ◉ {member_details[0].status}
              </small>
              <h3 className="dark:text-slate-300 text-slate-200 text-sm text-center capitalize font-semibold">
                {member_details[0].name}
              </h3>
              <h4 className="dark:text-slate-400 text-slate-300 text-xs text-center capitalize font-semibold">
                {member_details[0].dept}
              </h4>
            </div>
            <ul className="w-full capitalize">
              <li
                onClick={() =>
                  updateUserStatus(member_details[0].id, "available")
                }
                className="h-8 border-b border-t hover:opacity-80 dark:border-slate-500 border-slate-400 flex justify-between px-6 items-center space-x-2 text-xs text-green-500 cursor-pointer"
              >
                <span>◉ available</span>
                {member_details[0].status === "available" && (
                  <BsCheck className="text-lg" />
                )}
              </li>
              <li
                onClick={() => updateUserStatus(member_details[0].id, "busy")}
                className="h-8 border-b hover:opacity-80 dark:border-slate-500 border-slate-400 flex justify-between px-6 items-center space-x-2 text-xs text-yellow-500 cursor-pointer"
              >
                <span>◉ Busy</span>
                {member_details[0].status === "busy" && (
                  <BsCheck className="text-lg" />
                )}
              </li>
              <li
                onClick={() =>
                  updateUserStatus(member_details[0].id, "unavailable")
                }
                className="h-8 border-b hover:opacity-80 dark:border-slate-500 border-slate-400 flex justify-between px-6 items-center space-x-2 text-xs text-red-500 cursor-pointer"
              >
                <span>◉ Unavailable</span>
                {member_details[0].status === "unavailable" && (
                  <BsCheck className="text-lg" />
                )}
              </li>
            </ul>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
