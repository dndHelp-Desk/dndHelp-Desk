import { useEffect, useState } from "react";
import { useAuth, upload } from "./../Data_Fetching/Firebase";
import { BsCameraFill, BsBoxArrowUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store/NotificationsSlice";
import { updateUserStatus } from "../Data_Fetching/TicketsnUserData";

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

  //Change Agent Online Stutus ============
  const online = navigator.onLine;
  useEffect(() => {
    if (
      member_details[0].name !== "User Loader" &&
      member_details.length !== undefined &&
      online
    ) {
      updateUserStatus(member_details[0].id, "online");
    } else {
      member_details.length !== undefined &&
        currentUser &&
        member_details[0].name !== "User Loader" &&
        !online &&
        updateUserStatus(member_details[0].id, "offline");
    }
  }, [member_details, currentUser, online]);

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
    if (
      member_details.length !== undefined &&
      member_details[0].statuscurrentUser?.photoURL
    ) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser, member_details]);

  return (
    <>
      <form
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
              member_details[0].status === "online"
                ? "bg-green-500"
                : "bg-red-500"
            } right-[-2px] top-[-2px]`}
          ></span>
        </div>
      </form>
    </>
  );
};

export default Profile;
