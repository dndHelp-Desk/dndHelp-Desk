import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  editUser,
} from "../../Adapters/Data_Fetching/TicketsnUserData";
import { BiShowAlt } from "react-icons/bi";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  newUserModal: any;
  setModal: any;
  inputValues: any;
  setValues: any;
  edit: any;
  setEdit: any;
}

const NewUser: FC<Props> = ({
  newUserModal,
  setModal,
  inputValues,
  setValues,
  edit,
  setEdit,
}) => {
  const contacts = useSelector((state: RootState) => state.Tickets.contacts);
  const dispatch: AppDispatch = useDispatch();
  const accessRef = useRef<HTMLSelectElement>(null);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [companyChipValue, setCompany] = useState<string>("");
  const [revealPass, setReveal] = useState<boolean>(false);

  //Create User ===========================
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!edit) {
      fetch("https://dndhelp-desk-first.herokuapp.com/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputValues?.email?.trim()?.replace(/\s/g, ""),
          password: inputValues?.password,
          displayName: inputValues?.name,
        }),
      })
        .then((req) => req.json())
        .then(() => {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "New User Has Been Created Successfully",
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
                message: "Failed To Create New User" + error,
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
      createUser(
        inputValues?.name,
        inputValues?.dept,
        inputValues?.email,
        inputValues?.access,
        inputValues?.bio,
        inputValues?.active,
        inputValues?.companies
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
      setEdit(false);
      if (accessRef && accessRef.current) {
        accessRef.current.selectedIndex = 0;
      }
    } else {
      editUser(
        inputValues?.id,
        inputValues?.name,
        inputValues?.dept,
        inputValues?.access,
        inputValues?.active,
        inputValues?.companies
      );
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "User edited successfully",
            color: "bg-red-200",
            id: new Date().getTime(),
          },
        ])
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
      setEdit(false);
      if (accessRef && accessRef.current) {
        accessRef.current.selectedIndex = 0;
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 bg-[#0813227e] backdrop-blur-sm ${
        newUserModal ? "left-0" : "left-[200%]"
      } flex items-center justify-end z-[999] transition-all duration-200`}
    >
      {/**Add New User ==================== */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="h-full w-[33rem] dark:bg-slate-900 bg-white border-l border-slate-500 dark:border-slate-700  shadow-2xl flex flex-col justify-between space-y-2 overflow-hidden"
      >
        <div className="w-full h-[calc(100%-3.5rem)] p-6">
          <div className=" w-full h-fit overflow-hidden">
            <h3 className="mt-4 text-lg dark:text-slate-400 text-slate-800 capitalize font-bold font-sans flex items-center space-x-2">
              <span>add new user</span>
            </h3>
            <p className="mt-2 text-[0.8rem] dark:text-slate-400 text-slate-800 font-sans">
              If the user user you're adding is a client or end user please make
              sure you associate them with a corresponding company. The option
              will be available once you change access to client then use the
              search to find the company macthing your client.
            </p>
          </div>

          <div className="mt-6 w-full h-[75%] overflow-hidden overflow-y-scroll px-4 space-y-4 dark:autofill:bg-slate-900">
            {" "}
            <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full-Name ..."
                required
                onChange={(e) =>
                  setValues({ ...inputValues, name: e.target.value })
                }
                value={inputValues?.name}
                className="newuser_input"
              />
            </div>
            <div
              className={`h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative ${
                edit ? "hidden" : ""
              }`}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email ..."
                required={edit ? false : true}
                onChange={(e) =>
                  setValues({ ...inputValues, email: e.target.value })
                }
                value={inputValues?.email}
                className="newuser_input"
              />
            </div>
            <div
              className={`h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative ${
                edit ? "hidden" : ""
              }`}
            >
              <input
                type={revealPass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password ..."
                required={edit ? false : true}
                minLength={6}
                onChange={(e) =>
                  setValues({ ...inputValues, password: e.target.value })
                }
                value={inputValues?.password}
                className="newuser_input"
              />
              <BiShowAlt
                onClick={() => {
                  setReveal((prev: boolean) => {
                    if (prev) {
                      return false;
                    } else {
                      return true;
                    }
                  });
                }}
                className={`absolute right-2 top-3 text-slate-700 dark:text-slate-400 ${
                  inputValues?.password?.length >= 2 ? "" : "hidden"
                }`}
              />
            </div>
            <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
              <select
                ref={accessRef}
                onChange={(e) =>
                  setValues({ ...inputValues, access: e.target.value })
                }
                className="newuser_input "
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
            </div>
            {/**Client Companies */}
            <div
              className={` ${
                inputValues?.access === "client" ? "" : "hidden"
              } h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative`}
            >
              <input
                type="search"
                name="company"
                id="company"
                autoComplete="nope"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                value={companyChipValue}
                placeholder="Search for the company"
                className="newuser_input"
              />
              {/**Dropdown list ================================ */}
              <div
                className={`absolute top-12 z-[999] w-full max-h-32 rounded shadow-xl bg-slate-100 dark:bg-slate-750 border border-slate-300 dark:border-slate-600 p-2 overflow-hidden ${
                  companyChipValue?.length <= 1 ? "hidden" : ""
                }`}
              >
                <ul className="w-full p-2 overflow-hidden overflow-y-scroll">
                  {contacts?.map((comp) => {
                    return (
                      <li
                        key={comp?.branch_company}
                        onClick={() => {
                          if (
                            inputValues?.companies
                              ?.replace(/\s/gi, "")
                              ?.toLowerCase()
                              ?.includes(
                                comp?.branch_company
                                  ?.replace(/\s/gi, "")
                                  ?.toLowerCase()
                              )
                          ) {
                            dispatch(
                              updateAlert([
                                ...alerts,
                                {
                                  message: "Company is already on the list",
                                  color: "bg-red-200",
                                  id: new Date().getTime(),
                                },
                              ])
                            );
                          } else {
                            if (inputValues?.companies?.length >= 2) {
                              setValues({
                                ...inputValues,
                                companies:
                                  inputValues?.companies +
                                  "," +
                                  comp?.branch_company,
                              });
                              setCompany("");
                            } else {
                              setValues({
                                ...inputValues,
                                companies: comp?.branch_company,
                              });
                              setCompany("");
                            }
                          }
                        }}
                        className={`h-8 w-full border-b border-slate-300 dark:border-slate-600 flex items-center cursor-pointer ${
                          comp?.branch_company
                            ?.replace(/\s/gi, "")
                            ?.toLowerCase()
                            ?.includes(
                              companyChipValue
                                ?.replace(/\s/gi, "")
                                ?.toLowerCase()
                            )
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <span className="text-xs font-sans text-slate-700 dark:text-slate-300 w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                          {comp?.branch_company}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/**Dropdown list ================================ */}
            </div>
            {/**Client Companies */}
            {/**Added Companies Chips ===================== */}
            <div
              className={`${
                inputValues?.access === "client" ? "flex" : "hidden"
              } flex-wrap w-full h-[7.75rem] p-2 gap-1 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar`}
            >
              {inputValues?.companies?.trim()?.length >= 3 &&
                inputValues?.companies
                  ?.trim()
                  ?.split(/[/,]/)
                  ?.map((companies: string) => {
                    return (
                      <div
                        key={companies}
                        className="h-6 w-fit rounded-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-between space-x-1 overflow-hidden text-xs p-1 pl-2 cursor-default"
                      >
                        <span className="w-fit overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <abbr title={companies}>{companies}</abbr>
                        </span>
                        <button
                          onClick={() => {
                            setValues({
                              ...inputValues,
                              companies: inputValues?.companies
                                ?.split(/[/,]/)
                                ?.filter((elem: string) => elem !== companies)
                                ?.join(","),
                            });
                          }}
                          type="button"
                          className="w-4 h-full outline-none focus:outline-none font-bold border-l border-slate-400 flex justify-center items-center text-red-600"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
            </div>
            {/**Added Companies Chips ===================== */}
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
                value={inputValues?.dept}
                className="newuser_input"
              />
            </div>
          </div>
        </div>

        {/**bottom Option */}
        <div className="w-full h-14 z-[99] border-t border-slate-300 dark:border-slate-800 flex justify-between items-center p-2 px-6 bg-inherit">
          <button
            type="button"
            onClick={() => {
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
              setEdit(false);
              if (accessRef && accessRef.current) {
                accessRef.current.selectedIndex = 0;
              }
            }}
            className="outline-none focus:outline-none text-sm text-slate-700 dark:text-slate-200 font-sans w-28 h-8 dark:bg-slate-800 bg-slate-100 border border-slate-300 dark:border-slate-600 rounded-sm hover:opacity-80 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="outline-none focus:outline-none text-sm text-slate-50 font-sans w-28 h-8 dark:bg-blue-700 bg-slate-800 rounded-sm hover:opacity-80 transition-all"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
