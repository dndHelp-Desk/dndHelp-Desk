import React, { useState } from "react";
import { useSelector } from "react-redux";
import noUsers from "./../MainComponent/images/no-userss.svg";
import { deleteUser, activateUser } from "../Data_Fetching/TicketsnUserData";
import {
  BsFillTrashFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsBuilding,
  BsLockFill,
} from "react-icons/bs";

const Team = () => {
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const [inputValues, setValues] = useState({
    name: "",
    dept: "",
    email: "",
    password: "",
    access: "",
    bio: "",
    active: true,
    status: "unavailable",
    photoUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...inputValues, name: "", dept: "", bio: "" });
  };

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      let id = user.id;
      return (
        <div
          key={id}
          className="w-full snap_child h-16 rounded-lg dark:bg-[#1e293b9c] bg-slate-200 grid grid-cols-5 space-x-4 p-2 border dark:border-slate-800 border-slate-300"
        >
          <div className="col-span-3 space-x-1 items-center flex">
            <div className="h-10 w-10 rounded-xl border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
              <img
                src={
                  user.photoUrl !== null
                    ? user.photoUrl
                    : "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/no-profile.jpg?alt=media&token=82e21d0b-4af2-40d3-9f69-5ff676aa36d5"
                }
                alt="profile"
                className="object-cover w-full h-full object-center rounded-lg"
              />
            </div>
            <h3 className="text-sm font-semibold capitalize dark:text-slate-400 text-slate-600 w-40">
              {user.name}
              <br />
              <small className="capitalize col-span-1 dark:text-slate-500 text-slate-500 w-40">
                {user.dept}
              </small>
            </h3>
          </div>
          <div className="text-xs items-right flex justify-end items-center col-span-2 space-x-4">
            <div className="cursor-pointer rounded-full bg-slate-400 relative shadow-sm">
              <abbr title="Activate / Deactivate">
                <input
                  onChange={(e) => activateUser(id, e.target.checked)}
                  type="checkbox"
                  name="toggle"
                  id="toggle1"
                  checked={user.active}
                  className={`focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto ${
                    user.active && "right-0"
                  }`}
                />
                <label
                  htmlFor="toggle1"
                  className="toggle-label dark:bg-slate-700 block w-8 h-3 overflow-hidden rounded-full bg-slate-400 cursor-pointer"
                />
              </abbr>
            </div>
            <abbr title="Delete Account">
              <button
                onClick={() => deleteUser(user.id)}
                className="h-8 w-8 rounded-xl outline-none focus:outline-none flex items-center justify-center dark:bg-slate-800 bg-slate-300 hover:opacity-80"
              >
                <BsFillTrashFill className="text-red-500 cursor-pointer text-base" />
              </button>
            </abbr>
          </div>
        </div>
      );
    });

  //Component ==================
  return (
    <div className="h-full w-full grid grid-cols-2 gap-2">
      <div className="col-span-1 p-1 py-2">
        <h6 className="dark:text-slate-300 text-slate-800 text-center text-base font-bold tracking-wide">
          All Members
        </h6>
        <section className="col-span-1 h-[35rem] dark:bg-slate-900 bg-slate-100 rounded-xl flex flex-col place-items-center p-4 overflow-hidden">
          {allMembers.length >= 1 && (
            <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
              <h2 className="w-full h-6 text-xs sticky top-0 z-[99] dark:bg-slate-900 bg-slate-100 flex items-center justify-between space-x-4 font-semibold uppercase dark:text-slate-300 text-slate-700 px-3 border-b border-slate-300 dark:border-slate-700">
                <span>User-Name</span>
                <span>Action</span>
              </h2>
              {users}
            </div>
          )}
          {!allMembers.length >= 1 && (
            <div className="h-full w-full">
              <div className="h-full w-full rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300 p-6">
                <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center uppercase text-xs font-sans font-bold">
                  add your team members
                </h2>
                <img
                  src={noUsers}
                  alt="no-users"
                  className="object-center object-fit w-full h-full"
                />
              </div>
            </div>
          )}
        </section>
      </div>
      {/**Add New User ==================== */}
      <div className="col-span-1 lg:border-l dark:border-slate-800 border-slate-300 p-4">
        <h2 className="dark:text-slate-300 text-slate-800 text-sm font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          Add New User
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
              placeholder="Full-Name ..."
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
              type="email"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Email ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, email: e.target.value })
              }
              value={inputValues.name}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Password ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, name: e.target.value })
              }
              value={inputValues.name}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsLockFill className="absolute text-slate-500 text-lg top-3 left-4" />
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
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Team;
