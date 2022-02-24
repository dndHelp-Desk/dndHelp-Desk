import React, { useState } from "react";
import {
  BsSearch,
  BsSliders,
  BsFillTrashFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import NewTicket from "./NewTicket";
import TicketsList from "./TicketsList";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { deleteTicket, assignAgent } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import OffCanvasMenu from "../Others/OffCanvasMenu";

const TicketsComponent = () => {
  const [newTicketModal, setModal] = useState(false);
  const [filtersModal, setfiltersModal] = useState(false);
  const [deleteArray, setDelete] = useState([]);
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const activeUser = useSelector((state) => state.UserInfo.member_details);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const [contactsPanel, setPanel] = useState(false);
  const dispatch = useDispatch();

  //Close Contacts Modal on Click outside ===========
  const contactRef = useClickOutside(() => {
    setPanel(false);
  });

  //Delete Selected Ticlets/Ticket ==========
  const deleteSelected = () => {
    for (let i = 0; i < deleteArray.length; i++) {
      allTickets.length >= 1 &&
        allTickets
          .filter((ticket) => ticket.ticket_id === deleteArray[i])
          .forEach((ticket) => {
            deleteTicket(ticket.id);
          });
    }
    setDelete([]);
    dispatch(
      updateAlert({
        message: "Tickets Deleted Successfully",
        color: "bg-green-200",
      })
    );
  };

  //Assign Tickect To an Agent =================
  const assgn = (name) => {
    for (let i = 0; i < deleteArray.length; i++) {
      assignAgent(deleteArray[i], name);
    }
    setDelete([]);
    dispatch(
      updateAlert({
        message: `Tickets Assigned to ${name} Successfully`,
        color: "bg-green-200",
      })
    );
  };

  //Loop through each contact / available members List ====
  const membersList =
    allMembers.length >= 1 &&
    allMembers.map((contact) => {
      return (
        <button
          key={contact.id}
          onClick={() => {
            assgn(contact.name);
            setPanel(false);
          }}
          className="dark:bg-slate-400 bg-slate-300 w-full h-8 text-sm font-semibold dark:text-slate-800 text-slate-600 rounded-lg capitalize flex items-center p-2 space-x-2"
        >
          <BsFillPersonPlusFill /> <span>{contact.name}</span>
        </button>
      );
    });

  //Component ======================
  return (
    <div className="bg-transparent space-y-4 container w-[90%] md:w-full 2xl:w-[72rem] mt-4 rounded-xl pb-4 relative z-[-9]">
      {/**Navbar or Control Bar  ====================== */}
      <nav className="h-[2.5rem] flex justify-between items-center w-full relative">
        {/**Search Bar ============================== */}
        <div className="flex h-full gap-4">
          {/**Filter Btn ============================== */}
          <OffCanvasMenu
            filtersModal={filtersModal}
            setfiltersModal={setfiltersModal}
          />
          <button
            onClick={() => setfiltersModal(filtersModal ? false : true)}
            className="min-w-10 px-8 h-10 rounded-lg flex space-x-2 justify-between items-center dark:bg-slate-900 bg-slate-100 focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 hover:bg-slate-200 duration-300 transition-bg dark:text-slate-400 text-slate-500 text-sm  font-semibold"
          >
            <BsSliders className="dark:text-slate-400 text-slate-500 font-bold" />
            <span className="hidden md:flex">Filters</span>
          </button>

          {/**Delete Ticket ================================= */}
          <button
            onClick={() => deleteSelected()}
            className={`dark:bg-slate-900 bg-slate-100 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-full w-12 rounded-lg text-red-600  font-semibold ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="delete">
              <BsFillTrashFill />
            </abbr>
          </button>

          {/**Assign Agent ================================= */}
          <button
            onClick={() => setPanel(true)}
            className={`dark:bg-slate-900 bg-slate-100 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-full w-12 rounded-lg text-blue-600  font-semibold ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="Assign">
              <BsFillPersonPlusFill />
            </abbr>
          </button>
        </div>

        {/*** New Ticket ======================== */}
        <button
          onClick={() => setModal(true)}
          className="bg-blue-700  h-10 px-6 rounded-lg flex justify-center items-center text-slate-300  text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:bg-blue-800 duration-300 transition-bg font-semibold"
        >
          + New Ticket
        </button>
      </nav>

      {/**Agent List to assign ============= */}
      {activeUser[0].access === "admin" && (
        <div
          ref={contactRef}
          className={`h-[15rem] w-[12rem] bg-slate-700 shadow-2xl backdrop-blur-sm p-2 rounded-lg absolute left-32 top-8 z-[99] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-2 ${
            contactsPanel ? "" : "hidden"
          }`}
        >
          <div className="flex sticky top-0 border-b border-slate-400 h-8 items-center justify-center ">
            <BsSearch className="absolute left-3 text-slate-400 font-semibold" />
            <input
              className="w-full h-8 bg-transparent rounded-lg text-slate-400 text-sm md:px-10  placeholder-slate-400 border-0 focus:outline-none outline-none  focus:ring-0 transition-h duration-300"
              type="search"
              placeholder="Search ..."
            />
          </div>
          {membersList}
        </div>
      )}

      {/**Tickects /Not Expanded=========== */}
      <TicketsList deleteArray={deleteArray} setDelete={setDelete} />
      <NewTicket newTicketModal={newTicketModal} setModal={setModal} />
    </div>
  );
};

export default TicketsComponent;
