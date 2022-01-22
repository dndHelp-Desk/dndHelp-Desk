import { useEffect, useState } from "react";
import { useAuth, upload } from "./Firebase";
import { BsCameraFill } from "react-icons/bs";

const Profile = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [showChange, setChange] = useState(false);
  const [showChangeIcon, setChangeIcon] = useState("scale-0");
  const [photoURL, setPhotoURL] = useState("https://cutt.ly/mIFoGkV");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    setChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    upload(photo, currentUser);
    setChange(false);
  };

  useEffect(() => {}, [photo]);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      <form
        className="flex flex-col relative"
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          className={`text-xs ${
            showChange ? "" : "hidden"
          } font-bold top-[1.8rem] left-[-3rem] w-18 rotate-[-90deg] absolute bg-slate-800 p-1 px-3 rounded-lg flex flex-col items-center justify-center text-slate-200 cursor-pointer transition-scale duration-300`}
          type="submit"
        >
          Change
        </button>
        <div className="h-20  flex justify-center relative">
          <div
            onMouseOver={() => setChangeIcon("scale-100")}
            onMouseLeave={() => setChangeIcon("scale-0")}
            className="custom-shadow h-20 w-20 border-[3px] border-slate-600 rounded-xl flex justify-center items-center cursor-pointer p-[2px]"
          >
            <img
              className="rounded-lg bg-slate-500 h-full w-full object-cover object-center"
              src={photoURL}
              alt="profile"
            />
            <label
              className={`absolute bg-[#1c105283] h-20 w-20 rounded-xl flex flex-col items-center justify-center text-slate-200 cursor-pointer transition-scale duration-300 ${showChangeIcon}`}
              htmlFor="profile"
            >
              <span className="text-xs font-bold">Change</span>
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
        </div>
      </form>
    </>
  );
};

export default Profile;
