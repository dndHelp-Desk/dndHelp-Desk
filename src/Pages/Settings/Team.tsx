import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../../Assets/logos/faviLight.png";
import noUsers from "./../Main_Dashboard/images/no-userss.svg";
import { Navigate } from "react-router";
import { deleteUser } from "../../Adapters/Data_Fetching/TicketsnUserData";
import { BsFillTrashFill, BsPencilSquare, BsSearch } from "react-icons/bs";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import NewUser from "./NewUser";
import { AppDispatch, RootState } from "../../Redux/store";
import EditUser from "./EditUser";
import ActionPanel from "../../Components/ActionPanel";

const Team: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const [newUserModal, setModal] = useState<boolean | any>(false);
  const [editUserModal, setEditModal] = useState<boolean | any>(false);
  const [editId, setId] = useState<any>({});
  const [search, setSearch] = useState<string | any>(" ");
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const [argument, setArg] = useState<any[]>([]);

  //Delete User ================
  const deleteMember = () => {
    fetch("https://dndhelp-desk-first.herokuapp.com/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: argument[1],
      }),
    })
      .then((req) => req.json())
      .then(() => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Deleted User Successfully",
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
              message: error.status,
              color: "bg-red-200",
              id: new Date().getTime(),
            },
          ])
        );
      });
    deleteUser(argument[0]);
    setArg([]);
  };

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      let id = user.id;
      return (
        <tr
          key={id}
          className={`w-full snap_child h-16 rounded dark:bg-slate-800 bg-white grid grid-cols-9 space-x-4 p-2 border dark:border-slate-700 border-slate-300 ${
            user.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true ||
            user.email
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <td className="col-span-4 space-x-4 items-center flex">
            <div className="h-10 w-10 rounded border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : defaultProfile
                }
                alt="profile"
                className="object-cover w-full h-full object-center rounded-sm"
              />
            </div>
            <p className="text-sm whitespace-nowrap tracking-tight overflow-hidden text-ellipsis font-medium capitalize dark:text-slate-300 text-slate-800">
              <abbr title={user.name}>{user.name}</abbr>
              <br />
              <small className="capitalize col-span-1 dark:text-slate-400 text-slate-700 tracking-tight">
                {user.dept} / {user.access}
              </small>
            </p>
          </td>
          <td className="col-span-4 h-full">
            <p className="h-full text-xs lowercase font-medium italic whitespace-nowrap overflow-hidden text-ellipsis dark:text-slate-400 text-slate-700 hidden md:flex items-center">
              <abbr title={user.email}>{user.email}</abbr>
            </p>
          </td>
          <td className="col-span-1 text-xs items-right flex justify-end items-center space-x-4">
            {/**Edit Account */}
            <button
              onClick={() => {
                setEditModal(true);
                setId({
                  id: user.id,
                  name: user.name,
                  dept: user.dept,
                  access: user.access,
                  active: user.active,
                  companies: user.companies,
                });
              }}
              className="h-8 w-8 rounded outline-none focus:outline-none flex items-center justify-center bg-inherit hover:opacity-80"
            >
              <abbr title="Edit User">
                <BsPencilSquare className="text-slate-700 dark:text-slate-400 text-base" />
              </abbr>
            </button>

            {/**Delete Account */}
            <button
              onClick={() => {
                setArg([user.id, user.uid]);
                setActionPanel(true);
              }}
              className="h-8 w-8 rounded outline-none focus:outline-none flex items-center justify-center bg-inherit hover:opacity-80"
            >
              <abbr title="Delete Account">
                <BsFillTrashFill className="text-red-500  text-base" />
              </abbr>
            </button>
          </td>
        </tr>
      );
    });

  //Allow Admin Only ==========================
  if (member_details[0]?.access !== "admin") {
    return <Navigate to="/app" />;
  }

  //Component ==================
  return (
    <div className="h-full w-full">
      {/**Delele Ticket Action Panel ====== */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        deleteSelected={deleteMember}
        option="user"
      />
      {/**Delele Ticket Action Panel ====== */}

      <div className="flex items-center justify-between sticky top-0 bg-slate-200 dark:bg-slate-750 z-[99] pt-4">
        <h1 className="dark:text-slate-300 text-slate-800  text-xl font-bold tracking-wide">
          All Members
        </h1>
        <div className="flex items-center gap-4">
          <label className="relative" htmlFor="searchUser">
            <input
              type="search"
              name="searchUser"
              id="searchUser"
              placeholder="Quick Search ..."
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-[15rem] transition-all bg-transparent border-0 border-b dark:border-slate-700 border-slate-500 focus:ring-0 focus:border-slate-400 dark:focus:border-slate-800 text-slate-600 dark:text-slate-400 placeholder:text-xs placeholder:text-slate-600 dark:placeholder:text-slate-400 z-[999] pl-8"
            />
            <BsSearch
              className={`absolute top-3 left-3 text-slate-600 dark:text-slate-400 text-sm ${
                search !== " " && "hidden"
              }`}
            />
          </label>
          <button
            onClick={() => setModal(true)}
            className="h-10 px-4 rounded-sm bg-slate-800 dark:bg-indigo-700 text-slate-100 font-medium text-sm flex items-center justify-center outline-none focus:outline-none"
          ><span>Add New Member</span>
          </button>
        </div>
      </div>
      <section className="h-[49rem] bg-transparent rounded flex flex-col place-items-center mt-1 py-4 overflow-hidden">
        {allMembers.length >= 1 && (
          <table className="w-full h-full flex flex-col justify-between">
            <thead className="w-full sticky top-0 bg-inherit">
              <tr className="w-full h-6 mb-4 text-xs sticky top-0 z-[99] grid grid-cols-9 gap-2 font-semibold uppercase dark:text-slate-300 text-slate-700 border-b border-slate-400 dark:border-slate-700 bg-inherit">
                <th className="col-span-4 text-left">User</th>
                <th className="col-span-4 text-left pl-4">Email</th>
                <th className="col-span-1 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="w-full h-[45rem] overflow-hidden overflow-y-scroll scroll-snap space-y-2 pr-2">
              {users}
            </tbody>
          </table>
        )}
        {allMembers.length <= 0 && (
          <div className="h-full w-full">
            <div className="h-full w-full rounded border dark:border-slate-700 border-slate-400 p-6">
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

      {/**Add New User ============================= */}
      <NewUser newUserModal={newUserModal} setModal={setModal} />
      {/**Edit User =============================== */}
      <EditUser
        editUserModal={editUserModal}
        setEditModal={setEditModal}
        editId={editId}
        setId={setId}
      />
    </div>
  );
};

export default Team;
