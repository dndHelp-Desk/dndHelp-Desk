import { useEffect, useState } from "react";
import { useAuth, upload } from "./Firebase";
import {
  BsCameraFill,
  BsBoxArrowUp,
  BsCheck,
  BsStopFill,
  BsPerson,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {
  updateUserStatus,
  updateProfileUrl,
  updateUID,
} from "../../Adapters/Data_Fetching/TicketsnUserData";
import defaultProfile from "../../Assets/logos/faviLight.png";
import { AppDispatch, RootState } from "../../Redux/store";
import { updateUser } from "../../Redux/Slices/UserSlice";

const Profile = () => {
  const currentUser: any = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [change, setNewChange] = useState<boolean | string>(true);
  const [showChange, setChange] = useState(false);
  const [showChangeIcon, setChangeIcon] = useState<string>("scale-0");
  const member_details: any[] = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [photoURL, setPhotoURL] = useState<string>(defaultProfile);
  const dispatch: AppDispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> | null = (
    e
  ) => {
    let target: any = e.target; //<-- This (any) will tell compiler to shut up!
    let content: any = target.files[0];
    if (content) {
      setPhoto(content);
    }
    setChange(true);
  };

  //Submit profile to the DB =========
  const handleSubmit = (e: any) => {
    e.preventDefault(e);
    photo && upload(photo, currentUser);
    setNewChange(false);
    setChange(false);
  };

  //Apply Changes to the Profile =========
  change === false &&
    setTimeout(() => {
      setPhotoURL(currentUser?.photoURL);
      setNewChange(true);
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Profile Changed Successfully",
            color: "bg-green-200",
            id: new Date().getTime(),
          },
        ])
      );
    }, 3000);

  useEffect(() => {
    if (
      member_details.length >= 1 &&
      member_details[0].id !== false &&
      currentUser
    ) {
      currentUser.photoURL !== null && setPhotoURL(currentUser.photoURL);
      member_details[0].photoUrl &&
        currentUser.photoURL === null &&
        updateProfileUrl(
          member_details.length >= 1 && member_details[0].id,
          currentUser.photoURL
        );
      member_details[0].uid?.length <= 1 &&
        updateUID(member_details[0].id, currentUser.uid);
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
          } font-bold text-base tracking-wide z-[99] top-1 left-1  absolute bg-slate-50 p-2 rounded-full flex flex-col items-center justify-center text-slate-800 cursor-pointer transition-scale duration-300`}
          type="submit"
        >
          <BsBoxArrowUp />
        </button>
        <div className="h-fit flex justify-center relative">
          <div
            onMouseOver={() => setChangeIcon("scale-100")}
            onMouseLeave={() => setChangeIcon("scale-0")}
            className="h-10 w-10  rounded-full flex justify-center items-center cursor-pointer overflow-hidden"
          >
            <img
              className="rounded-full bg-slate-500 h-full w-full object-cover object-center border-2 dark:border-slate-300 border-slate-900"
              src={photoURL}
              alt="profile"
            />
            <label
              className={`absolute bg-[#1c105283] h-9 w-9 rounded-full flex flex-col items-center justify-center text-slate-200 cursor-pointer transition-scale duration-300 ${showChangeIcon}`}
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
            className={`absolute h-3 w-3 rounded-full border-2 dark:border-slate-800 border-white  ${
              member_details.length >= 1 &&
              member_details[0].status === "available"
                ? "bg-green-500"
                : member_details.length >= 1 &&
                  member_details[0].status === "busy"
                ? "bg-yellow-500"
                : "bg-red-500"
            } right-0 top-[-2px]`}
          ></span>

          {/** Change Agent Online Stutus ============*/}
          <div
            role="tooltip"
            className="bg-transparent p-1 pt-4 absolute right-[-0.3rem] top-[2.3rem] hidden group-hover:flex flex-col transition-all duration-500"
          >
            <div className="min-w-[12rem] p-4 z-[999] dark:bg-slate-900 bg-white border dark:border-slate-700 border-slate-300 flex flex-col items-center pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded after:content-[''] after:absolute after:right-[1rem] after:top-[0.5rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit transition-all duration-500">
              <div className="pb-2">
                <h1 className="dark:text-slate-300 text-slate-900 text-sm text-center capitalize font-semibold flex items-center gap-1">
                  <BsPerson />
                  <span>
                    {member_details.length >= 1 && member_details[0].name}
                  </span>
                </h1>
              </div>
              <ul className="w-full capitalize">
                <li
                  onClick={() => {
                    updateUserStatus(
                      member_details.length >= 1 && member_details[0].id,
                      "available"
                    );
                    dispatch(
                      updateUser([
                        { ...member_details[0], status: "available" },
                      ])
                    );
                    window.localStorage.setItem(
                      "user",
                      JSON.stringify({
                        ...member_details[0],
                        status: "available",
                      })
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                            id: new Date().getTime(),
                          },
                        ])
                      );
                    }, 1500);
                  }}
                  className="h-8 border-b border-t hover:opacity-80 dark:border-slate-800 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-green-500 cursor-pointer font-semibold"
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
                    dispatch(
                      updateUser([{ ...member_details[0], status: "busy" }])
                    );
                    window.localStorage.setItem(
                      "user",
                      JSON.stringify({
                        ...member_details[0],
                        status: "busy",
                      })
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                            id: new Date().getTime(),
                          },
                        ])
                      );
                    }, 1500);
                  }}
                  className="h-8 border-b hover:opacity-80 dark:border-slate-800 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-yellow-500 cursor-pointer font-semibold"
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
                    dispatch(
                      updateUser([
                        { ...member_details[0], status: "unavailable" },
                      ])
                    );
                    window.localStorage.setItem(
                      "user",
                      JSON.stringify({
                        ...member_details[0],
                        status: "unavailable",
                      })
                    );
                    setTimeout(() => {
                      dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Status Changed",
                            color: "bg-green-200",
                            id: new Date().getTime(),
                          },
                        ])
                      );
                    }, 1500);
                  }}
                  className="h-8 border-b hover:opacity-80 dark:border-slate-800 border-slate-200 flex justify-between px-6 items-center space-x-2 text-xs text-red-500 cursor-pointer font-semibold"
                >
                  <span className="flex items-center space-x-1">
                    <BsStopFill /> <span>Away</span>
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
