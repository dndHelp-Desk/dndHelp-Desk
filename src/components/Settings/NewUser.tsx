import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Data_Fetching/TicketsnUserData";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsBuilding,
  BsPersonLinesFill,
  BsLockFill,
} from "react-icons/bs";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  newUserModal: any;
  setModal: any;
}

const NewUser: FC<Props> = ({ newUserModal, setModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const closeModalRef = useClickOutside(() => {
    setModal(false);
  });
  const [inputValues, setValues] = useState<any>({
    name: "",
    dept: "",
    email: "",
    access: "",
    bio: "",
    active: true,
    password: "",
    companies: "",
  });

  //Create User ===========================
  const handleSubmit = (e: React.SyntheticEvent) => {
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
      inputValues.active,
      inputValues.companies
    );
    setValues({
      name: "",
      dept: "",
      email: "",
      access: "",
      bio: "",
      active: true,
      password: "",
      companies: "",
    });
    setModal(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 bg-[#0813227e] backdrop-blur-sm ${
        newUserModal ? "flex" : "hidden"
      } items-center justify-center z-[999]`}
    >
      {/**Add New User ==================== */}
      <div
        ref={closeModalRef}
        className="w-[25rem] dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 flex flex-col items-center justify-center rounded p-4"
      >
        <h2 className="dark:text-slate-300 text-slate-800 text-base font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden uppercase">
          Add New User
        </h2>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="mt-2 space-y-3 pb-5 w-[90%] flex flex-col items-center"
        >
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="nope"
              placeholder="Password ..."
              required
              minLength={6}
              onChange={(e) =>
                setValues({ ...inputValues, password: e.target.value })
              }
              value={inputValues.password}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsLockFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <select
              onChange={(e) =>
                setValues({ ...inputValues, access: e.target.value })
              }
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 "
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
          <div
            className={` ${
              inputValues.access === "client" ? "" : "hidden"
            } h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative`}
          >
            <input
              type="text"
              name="company"
              id="company"
              autoComplete="nope"
              placeholder="Companies / Restuarants ..."
              onChange={(e) =>
                setValues({ ...inputValues, companies: e.target.value })
              }
              value={inputValues.companies}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <button
            type="submit"
            className="bg-blue-700 px-4 p-2 text-slate-300 font-semibold text-sm rounded hover:opacity-80 outline-none focus:outline-none uppercase"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
