import React, { useState } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  BsSearch,
  BsFunnelFill,
  BsFillTrashFill,
  BsFillPersonPlusFill,
  BsCheck2Square,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import {
  deleteTicket,
  assignAgent,
  addNotification,
} from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import OffFilters from "./OffFilters";

const Navbar = ({ deleteArray, setDelete, setModal, filters, setFilters }) => {
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
            if (
              ticket.hasRecording === true ||
              ticket.hasRecording === "true"
            ) {
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
            }
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
  const assgn = (name, email, id) => {
    for (let i = 0; i < deleteArray.length; i++) {
      allTickets.length >= 1 &&
        allTickets
          .filter((ticket) => ticket.ticket_id === deleteArray[i])
          .forEach((ticket) => {
            assignAgent(ticket.id, name, email, user[0].name);
            addNotification(
              id,
              "You've got a new Ticket",
              `You've been sssigned a ticket with id: ${ticket.ticket_id} by:${user[0].name}`
            );
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
            assgn(member.name, member.email, member.id);
            setPanel(false);
          }}
          className={`border border-slate-200 dark:border-slate-700 dark:bg-slate-600 bg-slate-50 w-full h-8 text-xs font-semibold dark:text-slate-300 text-slate-600 rounded capitalize flex items-center p-2 space-x-2 ${
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
    <nav className="flex pb-1.5 justify-between items-center w-full relative mt-[0.30rem]">
      {/**Search Bar ============================== */}
      <div className="flex items-center h-full gap-2 relative">
        {/**Filter Btn ============================== */}
        <OffFilters
          filtersModal={filtersModal}
          setfiltersModal={setfiltersModal}
          filters={filters}
          setFilters={setFilters}
        />
        <button
          onClick={() => setfiltersModal(true)}
          className="h-9 w-11 rounded flex space-x-2 justify-center items-center dark:bg-[#182235] bg-slate-50 focus:outline-none outline-none hover:opacity-80 hover:bg-slate-200 duration-300 transition-bg text-lg font-semibold  border dark:border-[#33415596] border-slate-300"
        >
          <abbr title="filters" className="">
            <BsFunnelFill className="dark:text-slate-300 text-slate-800 font-bold" />
          </abbr>
        </button>

        {/**Assign Agent ================================= */}
        <button
          onClick={() => setPanel(true)}
          className={`dark:bg-[#182235] bg-slate-50 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-9 w-11 rounded  dark:text-slate-300 text-slate-800  font-semibold  border dark:border-[#33415596] border-slate-300 ${
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
          onClick={() => {
            let code = prompt("Enter Pin To Perform Action");
            code === "0001" ? deleteSelected() : alert("Wrong Pin");
          }}
          className={`dark:bg-[#182235] bg-slate-50 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-9 w-11 rounded  text-red-600  font-semibold  border dark:border-[#33415596] border-slate-300 ${
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
        <button
          className={`dark:bg-[#182235] bg-slate-50 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-9 w-11 rounded  flex items-center justify-center  border dark:border-[#33415596] border-slate-300  ${
            deleteArray.length >= 1 && activeUser[0].access === "admin"
              ? "flex"
              : "hidden"
          }`}
        >
          <label
            htmlFor="selectAll"
            className="text-lg dark:text-slate-200 text-slate-800 cursor-pointer"
          >
            <input
              onChange={(e) =>
                e.target.checked === true ? markAll() : setDelete([])
              }
              className={`dark:bg-slate-800 bg-slate-200 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-4 w-4 rounded  text-blue-600 cursor-pointer font-semibold custom-shadow  items-center justify-center text-lg hidden`}
              type="checkbox"
              name="selectAll"
              id="selectAll"
            />
            <BsCheck2Square />
          </label>
        </button>

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
          className="border-[#2564ebea] border text-[#2564ebe8] h-9 dark:bg-[#1e293b9c] bg-slate-50 px-6 space-x-2 rounded flex justify-center items-center text-sm font-base tracking-wide focus:outline-none outline-none duration-300 transition-bg font-semibold custom-shadow"
        >
          <span>NEW</span>
        </button>
      </abbr>
    </nav>
  );
};

export default Navbar;
