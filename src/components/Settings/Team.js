import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noUsers from "./../MainComponent/images/no-userss.svg";
import { Navigate } from "react-router";
import {
  deleteUser,
  activateUser,
  createUser,
} from "../Data_Fetching/TicketsnUserData";
import {
  BsFillTrashFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsBuilding,
  BsPersonLinesFill,
  BsLockFill,
  BsSearch,
} from "react-icons/bs";
import { updateAlert } from "../../store/NotificationsSlice";

const Team = () => {
  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const [search, setSearch] = useState(" ");
  const [inputValues, setValues] = useState({
    name: "",
    dept: "",
    email: "",
    access: "",
    bio: "",
    active: true,
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://dndhelp-desk-first.herokuapp.com/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputValues.email,
        password: inputValues.password,
        displayName: inputValues.name,
      }),
    })
      .then((req) => {
        req.json();
      })
      .then(() => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "New User Has Been Created Successfully",
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
              message: "Failed To Create New User" + error,
              color: "bg-red-200",
            },
          ])
        );
      });
    createUser(
      inputValues.name,
      inputValues.dept,
      inputValues.email,
      inputValues.access,
      inputValues.bio,
      inputValues.active
    );
    setValues({
      ...inputValues,
      name: "",
      dept: "",
      bio: "",
      email: "",
      password: "",
    });
  };

  //Delete User ================
  const deleteMember = (id, uid) => {
    fetch("https://dndhelp-desk-first.herokuapp.com/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
      }),
    })
      .then((req) => {
        req.json();
      })
      .then(() => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Delete User Successfully",
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
              message: error.status,
              color: "bg-red-200",
            },
          ])
        );
      });
    deleteUser(id);
  };

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      let id = user.id;
      return (
        <div
          key={id}
          className={`w-full snap_child h-16 rounded-lg dark:bg-[#1e293b9c] bg-slate-200 grid grid-cols-5 space-x-4 p-2 border dark:border-slate-800 border-slate-300 ${
            user.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <div className="col-span-3 space-x-1 items-center flex">
            <div className="h-10 w-10 rounded-xl border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/no-profile.jpg?alt=media&token=82e21d0b-4af2-40d3-9f69-5ff676aa36d5"
                }
                alt="profile"
                className="object-cover w-full h-full object-center rounded-lg"
              />
            </div>
            <h3 className="text-sm whitespace-nowrap overflow-hidden text-ellipsis font-semibold capitalize dark:text-slate-400 text-slate-600 w-40">
              <abbr title={user.name}>{user.name}</abbr>
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
                  checked={Boolean(user.active)}
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
                onClick={() => {
                  let code = prompt("Enter Pin To Perform Action");
                  code === "0001"
                    ? deleteMember(user.id, user.uid)
                    : alert("Wrong Pin");
                }}
                className="h-8 w-8 rounded-xl outline-none focus:outline-none flex items-center justify-center dark:bg-slate-800 bg-slate-300 hover:opacity-80"
              >
                <BsFillTrashFill className="text-red-500 cursor-pointer text-base" />
              </button>
            </abbr>
          </div>
        </div>
      );
    });

  //Allow Admin Only ==========================
  if (member_details[0].access !== "admin") {
    return <Navigate to="/app" />;
  }

  //Component ==================
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="col-span-1 p-1 py-2">
        <div className="flex items-center justify-between">
          <h6 className="dark:text-slate-300 text-slate-800  text-base font-bold tracking-wide">
            All Members
          </h6>
          <label className="relative" htmlFor="searchUser">
            <input
              type="search"
              name="searchUser"
              id="searchUser"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-10 focus:w-[12rem] transition-all bg-transparent rounded-lg border dark:border-slate-700 border-slate-500 focus:ring-0 focus:border-slate-400 dark:focus:border-slate-800 text-slate-600 dark:text-slate-400 z-[999]"
            />
            <BsSearch
              className={`absolute top-3 left-3 text-slate-600 dark:text-slate-400 text-sm ${
                search !== " " && "hidden"
              }`}
            />
          </label>
        </div>
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
      <div className="col-span-1 flex flex-col items-center justify-center lg:border-l dark:border-slate-800 border-slate-300 p-4">
        <h2 className="dark:text-slate-300 text-slate-800 text-base font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          Add New User
        </h2>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="mt-2 space-y-3 pb-5 w-[90%] flex flex-col items-center"
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
              name="email"
              id="email"
              autoComplete="nope"
              placeholder="Email ..."
              required
              onChange={(e) =>
                setValues({ ...inputValues, email: e.target.value })
              }
              value={inputValues.email}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="nope"
              placeholder="Password ..."
              required
              minLength="6"
              onChange={(e) =>
                setValues({ ...inputValues, password: e.target.value })
              }
              value={inputValues.password}
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsLockFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-lg dark:bg-slate-900 bg-slate-100 relative">
            <select
              onChange={(e) =>
                setValues({ ...inputValues, access: e.target.value })
              }
              className="bg-transparent w-full h-full rounded-lg dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow"
            >
              <option className="capitalize p-2" value="">
                Access
              </option>
              <option className="capitalize p-2" value="agent">
                Agent
              </option>
              <option className="capitalize p-2" value="admin">
                Admin
              </option>
              <option className="capitalize p-2" value="client">
                Client
              </option>
            </select>
            <BsPersonLinesFill className="absolute text-slate-500 text-lg top-3 left-4" />
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
