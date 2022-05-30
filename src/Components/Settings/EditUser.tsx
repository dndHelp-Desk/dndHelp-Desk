import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Data_Fetching/TicketsnUserData";
import {
  BsFillPersonFill,
  BsBuilding,
  BsPersonLinesFill,
} from "react-icons/bs";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  editUserModal: any;
  setEditModal: any;
  editId: any;
  setId: any;
}

const EditUser: FC<Props> = ({
  editUserModal,
  setEditModal,
  editId,
  setId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const accessRef = useRef<HTMLSelectElement>(null);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const closeModalRef = useClickOutside(() => {
    setEditModal(false);
  });

  //Create User ===========================
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    editUser(
      editId.id,
      editId.name,
      editId.dept,
      editId.access,
      editId.active,
      editId.companies
    );
    setId({
      name: "",
      dept: "",
      access: "",
      active: true,
      companies: "",
    });
    setEditModal(false);
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: "User Detail Edited Successfully",
          color: "bg-green-200",
          id: new Date().getTime(),
        },
      ])
    );
    if (accessRef && accessRef.current) {
      accessRef.current.selectedIndex = 0;
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 bg-[#0813227e] backdrop-blur-sm ${
        editUserModal ? "flex" : "hidden"
      } items-center justify-center z-[999]`}
    >
      {/**Add New User ==================== */}
      <div
        ref={closeModalRef}
        className="w-[25rem] dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 flex flex-col items-center justify-center rounded p-4 pt-8"
      >
        <h2 className="dark:text-slate-300 text-slate-800 text-base font-sans font-bold whitespace-nowrap text-ellipsis overflow-hidden uppercase">
          Edit User
        </h2>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="mt-2 space-y-3 pb-5 w-[90%] flex flex-col items-center"
        >
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="edit_name"
              id="edit_name"
              autoComplete="nope"
              placeholder="Full-Name ..."
              required
              onChange={(e) => setId({ ...editId, name: e.target.value })}
              value={editId.name}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <select
              ref={accessRef}
              onChange={(e) => setId({ ...editId, access: e.target.value })}
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
              editId.access === "client" ? "" : "hidden"
            } h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative`}
          >
            <input
              type="text"
              name="edit_company"
              id="edit_company"
              autoComplete="nope"
              placeholder="Companies / Restuarants ..."
              onChange={(e) => setId({ ...editId, companies: e.target.value })}
              value={editId.companies}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="edit_department"
              id="edit_department"
              autoComplete="nope"
              placeholder="Department ..."
              required
              onChange={(e) => setId({ ...editId, dept: e.target.value })}
              value={editId.dept}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsBuilding className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <button
            type="submit"
            className="bg-blue-700 px-4 p-2 text-slate-300 font-semibold text-sm rounded hover:opacity-80 outline-none focus:outline-none uppercase"
          >
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
