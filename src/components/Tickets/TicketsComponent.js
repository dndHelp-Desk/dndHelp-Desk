import React, { useState } from "react";
import {
  BsSearch,
  BsFillCalendar2RangeFill,
  BsFillTrashFill,
  BsPersonPlus,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import NewTicket from "./NewTicket";
import TicketsList from "./TicketsList";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { deleteTicket, assignAgent } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";

const TicketsComponent = () => {
  const [newTicketModal, setModal] = useState(false);
  const [searchResults, setSearchResults] = useState("");
  const [deleteArray, setDelete] = useState([]);
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const activeUser = useSelector((state) => state.UserInfo.member_details);
  const [contactsPanel, setPanel] = useState(false);
  const dispatch = useDispatch();

  //Close Contacts Modal on Click outside ===========
  const contactRef = useClickOutside(() => {
    setPanel(false);
  });

  //Delete Selected Ticlets/Ticket ==========
  const deleteSelected = () => {
    for (let i = 0; i < deleteArray.length; i++) {
      deleteTicket(deleteArray[i]);
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
          className="bg-slate-400 w-full h-8 text-sm font-semibold text-slate-800 rounded-xl capitalize"
        >
          {contact.name}
        </button>
      );
    });

  //Component ======================
  return (
    <div className="bg-gradient-to-b from-slate-500 to-slate-700 min-h-[40rem] mt-[-2rem]  absolute left-[9.5%] 2xl:left-[15%] z-0 2xl:w-[70%] px-1 overflow-hidden rounded-xl max-h-[42rem] 3xl:min-h-[80%] w-[80%] overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      {/**Navbar or Control Bar  ====================== */}
      <nav className="h-[3.5rem] sticky top-0 pt-2 flex justify-between items-center w-full overflow-x-hidden p-1">
        {/**Search Bar ============================== */}
        <div className="flex space-x-2 h-full">
          <div className="flex bg-slate-900 rounded-xl h-full items-center justify-center relative">
            <BsSearch className="absolute left-3 text-slate-400 font-semibold" />
            <input
              className="w-11 md:w-[18rem] h-full bg-transparent rounded-xl focus:w-[15rem] md:focus:w-[18rem] focus:px-4 md:focus:px-10 focus:bg-slate-900 md:focus:bg-transparent text-slate-400 text-sm md:px-10 z-[999] placeholder-slate-900 md:placeholder-slate-400 border-0 focus:outline-none outline-none  focus:ring focus:ring-slate-600 transition-h duration-300"
              type="search"
              placeholder="Quick Search ..."
              onChange={(e) => setSearchResults(e.target.value)}
            />
          </div>
          <button
            onClick={() => deleteSelected()}
            className={`bg-slate-900 h-full w-10 rounded-xl text-red-600 ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="delete">
              <BsFillTrashFill />
            </abbr>
          </button>
          <button
            onClick={() => setPanel(true)}
            className={`bg-slate-900 h-full w-10 rounded-xl text-blue-600 ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="Assign">
              <BsPersonPlus />
            </abbr>
          </button>
        </div>

        {/**Date Filter & New Tickect ============================== */}
        <div className="rounded-xl h-full flex justify-between items-center space-x-2">
          <button
            onClick={() => setModal(true)}
            className="bg-slate-900 h-full w-[92px] rounded-xl flex justify-center items-center text-slate-400 text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring focus:ring-slate-600 hover:bg-slate-800 duration-300 transition-bg"
          >
            + New
          </button>
          <button className="w-10 md:w-[200px] h-full rounded-xl flex justify-center items-center relative bg-slate-900 focus:outline-none outline-none  focus:ring focus:ring-slate-600 hover:bg-slate-800 duration-300 transition-bg text-slate-400 text-sm font-bas">
            <BsFillCalendar2RangeFill className="absolute left-3 text-slate-400" />
            <span className="hidden md:flex">Pick A Date ...</span>
          </button>
        </div>
      </nav>

      {/**Agent List to assign ============= */}
      {activeUser[0].access === "admin" && (
        <div
          ref={contactRef}
          className={`h-[15rem] w-[12rem] bg-[#141a697e] backdrop-blur-sm p-2 rounded-xl border border-slate-400 absolute left-[45px] md:left-[280px] z-[9999] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-2 ${
            contactsPanel ? "" : "hidden"
          }`}
        >
          <div className="flex sticky top-0 bg-slate-400 rounded-xl h-10 items-center justify-center ">
            <BsSearch className="absolute left-3 text-slate-800 font-semibold" />
            <input
              className="w-full h-10 bg-transparent rounded-xl text-slate-900 text-sm md:px-10 z-[999] placeholder-slate-800 border-0 focus:outline-none outline-none  focus:ring focus:ring-slate-700 transition-h duration-300"
              type="search"
              placeholder="Search ..."
            />
          </div>
          {membersList}
        </div>
      )}

      {/**Tickects /Not Expanded=========== */}
      <TicketsList
        searchResults={searchResults}
        setModal={setModal}
        deleteArray={deleteArray}
        setDelete={setDelete}
      />
      <NewTicket newTicketModal={newTicketModal} setModal={setModal} />
    </div>
  );
};

export default TicketsComponent;
