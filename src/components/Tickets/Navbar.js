import React, { useState } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  BsSearch,
  BsFunnelFill,
  BsFillTrashFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { deleteTicket, assignAgent } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import OffCanvasMenu from "../Others/OffCanvasMenu";

const Navbar = ({ deleteArray, setDelete, setModal }) => {
  const [filtersModal, setfiltersModal] = useState(false);
  const activeUser = useSelector((state) => state.UserInfo.member_details);
  const [contactsPanel, setPanel] = useState(false);
  const user = useSelector((state) => state.UserInfo.member_details);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const dispatch = useDispatch();
  const [searchAsssignee, setSearch] = useState("");
  const allMembers = useSelector((state) => state.UserInfo.allMembers);

  //Close Agents List on Click outside ===========
  const assigneeRef = useClickOutside(() => {
    setPanel(false);
  });

  //MarkAll ==========================================
  const markAll = () => {
    setDelete([]);
    let arr = [];
    filteredTickets.length >= 1 &&
      filteredTickets.forEach((ticket) => arr.push(ticket.ticket_id));
    setDelete(arr);
  };

  //Delete Selected Ticlets/Ticket ==========
  const deleteSelected = () => {
    // Create a reference to the file to delete
    const storage = getStorage();
    for (let i = 0; i < deleteArray.length; i++) {
      allTickets.length >= 1 &&
        allTickets
          .filter((ticket) => ticket.ticket_id === deleteArray[i])
          .forEach((ticket) => {
            deleteTicket(ticket.id);
            let recRef = ref(storage, `/dial_n_dine/${ticket.ticket_id}.wav`);
            // Delete the file
            deleteObject(recRef)
              .then(() => {
                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: "Recording Deleted Successfully",
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
                      message: error.message,
                      color: "bg-red-200",
                    },
                  ])
                );
              });
          });
    }
    setDelete([]);
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: "Tickets Deleted Successfully",
          color: "bg-green-200",
        },
      ])
    );
  };

  //Assign Tickect To an Agent =================
  const assgn = (name, email) => {
    for (let i = 0; i < deleteArray.length; i++) {
      allTickets.length >= 1 &&
        allTickets
          .filter((ticket) => ticket.ticket_id === deleteArray[i])
          .forEach((ticket) => {
            assignAgent(ticket.id, name, email);
          });
    }
    setDelete([]);
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: `Tickets Assigned to ${name} Successfully`,
          color: "bg-green-200",
        },
      ])
    );
  };

  //Loop through each contact / available members List ====
  const membersList =
    allMembers.length >= 1 &&
    allMembers.map((member) => {
      return (
        <button
          key={member.id}
          onClick={() => {
            assgn(member.name, member.email);
            setPanel(false);
          }}
          className={`dark:bg-slate-600 bg-slate-100 w-full h-8 text-sm font-semibold dark:text-slate-300 text-slate-600 rounded capitalize flex items-center p-2 space-x-2 ${
            member.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchAsssignee.toLowerCase().replace(/\s/g, "")) ===
            true
              ? ""
              : "hidden"
          }`}
        >
          <BsFillPersonPlusFill /> <span>{member.name}</span>
        </button>
      );
    });

  //Component ======================
  return (
    <nav className="flex pb-1.5 justify-between items-center w-full relative border-b mt-[0.30rem] border-slate-200 dark:border-slate-800">
      {/**Search Bar ============================== */}
      <div className="flex items-center h-full gap-2 relative">
        {/**Filter Btn ============================== */}
        <OffCanvasMenu
          filtersModal={filtersModal}
          setfiltersModal={setfiltersModal}
        />
        <button
          onClick={() => setfiltersModal(filtersModal ? false : true)}
          className="h-9 w-11 rounded-md flex space-x-2 justify-center items-center dark:bg-slate-800 bg-slate-200 focus:outline-none outline-none custom-shadow hover:opacity-80 hover:bg-slate-200 duration-300 transition-bg text-lg font-semibold"
        >
          <abbr title="filters" className="">
            <BsFunnelFill className="dark:text-slate-300 text-slate-800 font-bold" />
          </abbr>
        </button>

        {/**Assign Agent ================================= */}
        <button
          onClick={() => setPanel(true)}
          className={`dark:bg-slate-800 bg-slate-200 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-9 w-11 rounded-md  dark:text-slate-300 text-slate-800  font-semibold custom-shadow ${
            deleteArray.length >= 1 && activeUser[0].access === "admin"
              ? "flex"
              : "hidden"
          } items-center justify-center text-lg`}
        >
          <abbr title="Assign">
            <BsFillPersonPlusFill />
          </abbr>
        </button>

        {/**Delete Ticket ================================= */}
        <button
          onClick={() => deleteSelected()}
          className={`dark:bg-slate-800 bg-slate-200 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-9 w-11 rounded-md  text-red-600  font-semibold custom-shadow ${
            deleteArray.length >= 1 && activeUser[0].access === "admin"
              ? "flex"
              : "hidden"
          } items-center justify-center text-lg`}
        >
          <abbr title="delete">
            <BsFillTrashFill />
          </abbr>
        </button>

        {/**Mark All ================================= */}
        <label
          htmlFor="selectAll"
          className={`text-xs dark:text-slate-300 text-slate-800 flex items-center space-x-1 cursor-pointer ${
            deleteArray.length >= 1 && activeUser[0].access === "admin"
              ? "flex"
              : "hidden"
          }`}
        >
          <input
            onChange={(e) =>
              e.target.checked === true ? markAll() : setDelete([])
            }
            className={`dark:bg-slate-800 bg-slate-200 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-4 w-4 rounded-md  text-blue-600 cursor-pointer font-semibold custom-shadow  items-center justify-center text-lg`}
            type="checkbox"
            name="selectAll"
            id="selectAll"
          />
          <span>Mark All</span>
        </label>

        {/**Agent List to assign ============= */}
        {activeUser[0].access === "admin" && (
          <div
            ref={assigneeRef}
            className={`h-[15rem] w-[12rem] dark:bg-slate-700 bg-white shadow-2xl backdrop-blur-sm p-2 pt-0 border border-slate-400 dark:border-slate-700 rounded-lg absolute left-0 top-11 z-[99] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-2 ${
              contactsPanel ? "" : "hidden"
            }`}
          >
            <div className="flex sticky top-0 border-b border-slate-400 dark:bg-slate-700 bg-white shadow-2xl h-8 items-center justify-center ">
              <BsSearch className="absolute left-3 text-slate-400 font-semibold" />
              <input
                className="w-full h-8 bg-transparent rounded-lg text-slate-400 text-sm md:px-10  placeholder-slate-400 border-0 focus:outline-none outline-none  focus:ring-0 transition-h duration-300"
                type="search"
                placeholder="Search ..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {membersList}
          </div>
        )}
      </div>

      {/*** New Ticket ======================== */}
      <abbr title="New Ticket">
        <button
          onClick={() =>
            setModal(user[0].name !== "User Loader" ? true : false)
          }
          className="border-[#2564ebea] border text-[#2564ebe8] h-9 dark:bg-[#1e293b9c] bg-slate-200 px-4 space-x-2 rounded-md flex justify-center items-center  text-sm font-base tracking-wide focus:outline-none outline-none duration-300 transition-bg font-semibold custom-shadow"
        >
          <span>NEW</span>
        </button>
      </abbr>
    </nav>
  );
};

export default Navbar;
