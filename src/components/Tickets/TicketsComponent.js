import React, { useState } from "react";
import {
  BsSearch,
  BsSliders,
  BsFillTrashFill,
  BsPersonPlus,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import NewTicket from "./NewTicket";
import TicketsList from "./TicketsList";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { deleteTicket, assignAgent } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import Filters from "../Reports/Filters";

const TicketsComponent = () => {
  const [newTicketModal, setModal] = useState(false);
  const [filtersModal, setfiltersModal] = useState(false);
  const filtersModalRef = useClickOutside(() => {
    setfiltersModal(false);
  });
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
          className="bg-slate-400 w-full h-8 text-sm font-semibold text-slate-800 rounded-lg capitalize"
        >
          {contact.name}
        </button>
      );
    });

  //Component ======================
  return (
    <div className="bg-gradient-to-b from-slate-500 to-slate-700 mt-[-2rem] z-0 w-[80%] 2xl:w-[72rem] p-2 px-1 overflow-hidden rounded-xl min-h-[40rem] max-h-[42rem] 3xl:min-h-[80%] overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar relative">
      {/**Navbar or Control Bar  ====================== */}
      <nav className="h-[3.2rem] sticky top-0 flex justify-between items-center w-full overflow-x-hidden px-1 pb-1">
        {/**Search Bar ============================== */}
        <div className="flex space-x-2 h-full">
          <button
            onClick={() => setModal(true)}
            className="bg-slate-900 h-full px-8 rounded-lg flex justify-center items-center text-slate-400 text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring focus:ring-slate-600 hover:bg-slate-800 duration-300 transition-bg"
          >
            + New Ticket
          </button>
          <button
            onClick={() => deleteSelected()}
            className={`bg-slate-900 h-full w-10 rounded-lg text-red-600 ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="delete">
              <BsFillTrashFill />
            </abbr>
          </button>
          <button
            onClick={() => setPanel(true)}
            className={`bg-slate-900 h-full w-10 rounded-lg text-blue-600 ${
              deleteArray.length >= 1 ? "flex" : "hidden"
            } items-center justify-center text-lg`}
          >
            <abbr title="Assign">
              <BsPersonPlus />
            </abbr>
          </button>
        </div>

        {/**Filter Btn ============================== */}
        <button
          onClick={() => setfiltersModal(filtersModal ? false : true)}
          className="min-w-10 px-8 h-full rounded-lg flex space-x-2 justify-between items-center relative bg-slate-900 focus:outline-none outline-none  focus:ring focus:ring-slate-600 hover:bg-slate-800 duration-300 transition-bg text-slate-400 text-sm font-bas"
        >
          <BsSliders className=" text-slate-400" />
          <span className="hidden md:flex">Filters</span>
        </button>

        {/**Filters Menu =================== */}
        <div
          ref={filtersModalRef}
          className={`fixed ${
            filtersModal ? "" : "hidden"
          } bg-[#33415563] right-[11%] 2xl:right-[20%] top-[14rem] z-[999] w-[18rem] h-[15rem] rounded-lg backdrop-blur-md border-2 border-slate-400 flex flex-col items-center justify-center space-y-2 p-4`}
        >
          <Filters />
        </div>
      </nav>

      {/**Agent List to assign ============= */}
      {activeUser[0].access === "admin" && (
        <div
          ref={contactRef}
          className={`h-[15rem] w-[12rem] bg-[#141a697e] backdrop-blur-sm p-2 rounded-lg border border-slate-400 absolute left-[45px] md:left-[280px] z-[9999] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-2 ${
            contactsPanel ? "" : "hidden"
          }`}
        >
          <div className="flex sticky top-0 bg-slate-400 rounded-lg h-10 items-center justify-center ">
            <BsSearch className="absolute left-3 text-slate-800 font-semibold" />
            <input
              className="w-full h-10 bg-transparent rounded-lg text-slate-900 text-sm md:px-10 z-[999] placeholder-slate-800 border-0 focus:outline-none outline-none  focus:ring focus:ring-slate-700 transition-h duration-300"
              type="search"
              placeholder="Search ..."
            />
          </div>
          {membersList}
        </div>
      )}

      {/**Tickects /Not Expanded=========== */}
      <TicketsList
        setModal={setModal}
        deleteArray={deleteArray}
        setDelete={setDelete}
      />
      <NewTicket newTicketModal={newTicketModal} setModal={setModal} />
    </div>
  );
};

export default TicketsComponent;
