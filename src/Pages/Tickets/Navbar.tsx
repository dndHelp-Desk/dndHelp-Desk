import { FC, useState } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  BiTrash,
  BiUser,
  BiUserCheck,
  BiSelectMultiple,
  BiSearchAlt,
} from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import {
  deleteTicket,
  assignAgent,
  addNotification,
} from "../../Adapters/Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import OffFilters from "./OffFilters";
import { AppDispatch, RootState } from "../../Redux/store";
import ActionPanel from "../../Components/ActionPanel";
import HintTooltip from "../../Components/HintTooltip";

interface Props {
  deleteArray: any;
  setDelete: any;
  setModal: any;
  filters: any;
  setFilters: any;
  setList: any;
  contactsList: any;
  setValues: any;
}

const Navbar: FC<Props> = ({
  deleteArray,
  setDelete,
  setModal,
  filters,
  setFilters,
  setList,
  contactsList,
  setValues,
}) => {
  const [filtersModal, setfiltersModal] = useState<boolean | any>(false);
  const activeUser = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const [contactsPanel, setPanel] = useState<boolean | any>(false);
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const allTickets = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const dispatch: AppDispatch = useDispatch();
  const [searchAsssignee, setSearch] = useState("");
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );

  //Close Agents List on Click outside ===========
  const assigneeRef = useClickOutside(() => {
    setPanel(false);
  });

  //MarkAll ==========================================
  const markAll = () => {
    setDelete([]);
    let arr: any[] = [];
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
                        message: error.message,
                        color: "bg-red-200",
                        id: new Date().getTime(),
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
          id: new Date().getTime(),
        },
      ])
    );
  };

  //Assign Tickect To an Agent =================
  const assgn = (name: any, email: any, id: any) => {
    for (let i = 0; i < deleteArray.length; i++) {
      allTickets.length >= 1 &&
        allTickets
          .filter((ticket) => ticket.ticket_id === deleteArray[i])
          .forEach((ticket) => {
            assignAgent(ticket.id, name, email, user[0].name);
            addNotification(
              id,
              "You've got a new Ticket",
              `You've been assigned a ticket with id: ${ticket.ticket_id} 
              Assigned by : ${user[0].name}`
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
          id: new Date().getTime(),
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
          className={`border border-slate-400 dark:border-slate-700 dark:bg-slate-800 bg-slate-200 w-full h-8 text-xs font-semibold dark:text-slate-300 text-slate-700 rounded-sm capitalize flex items-center p-2 space-x-2 ${
            member.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchAsssignee.toLowerCase().replace(/\s/g, "")) ===
            true
              ? ""
              : "hidden"
          }`}
        >
          <BiUser /> <span>{member.name}</span>
        </button>
      );
    });

  //Get Draft Message From the Local Storage ==============
  const initialDraft = () => {
    const draft = localStorage.getItem("newTicketDraftValues");
    return draft
      ? JSON.parse(draft)
      : {
          recipient_name: "",
          recipient_email: "",
          agent: "",
          agent_email: "",
          priority: "",
          category: "",
          branch_company: "",
          message: "<p></p>",
          state: "",
          date: "",
          complainant_name: "",
          complainant_email: "none",
          complainant_number: "",
          send_as: "",
        };
  };

  //Component ======================
  return (
    <nav className="flex min-h-[3.5rem] h-[3.9rem] bg-transparent justify-between items-center w-full relative px-4 border-b dark:border-[#33415596] border-slate-300">
      {/**Delele Ticket Action Panel ====== */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        deleteSelected={deleteSelected}
        option="ticket"
      />
      {/**Delele Ticket Action Panel ====== */}

      <div className="flex items-center h-full gap-2 relative">
        {/**Filter Btn ============================== */}
        <OffFilters
          filtersModal={filtersModal}
          setfiltersModal={setfiltersModal}
          filters={filters}
          setFilters={setFilters}
          setList={setList}
          contactsList={contactsList}
        />
        <div className="relative group">
          <button
            onClick={() => setfiltersModal(true)}
            className="h-8 w-9 rounded-sm flex space-x-2 justify-center items-center dark:bg-[#182235] bg-slate-100 focus:outline-none outline-none hover:translate-y-[-1px] duration-300 transition-all text-lg font-semibold  border dark:border-slate-700 border-slate-400"
          >
            <HiFilter className="dark:text-slate-300 text-slate-800 font-bold" />
          </button>
          <HintTooltip
            details={"Open filters"}
            positions={{
              horizontal: `left-0`,
              vertical: `bottom-[-110%]`,
            }}
          />
        </div>

        {/**Assign Agent ================================= */}
        <div className="relative group">
          <button
            onClick={() => setPanel(true)}
            className={`dark:bg-[#182235] bg-slate-100 dark:focus:ring-slate-600 focus:ring-slate-400  hover:translate-y-[-1px] duration-300 transition-all h-8 w-9 rounded-sm  dark:text-slate-300 text-slate-800  font-semibold  border dark:border-slate-700 border-slate-400 ${
              deleteArray.length >= 1 && activeUser[0]?.access === "admin"
                ? "flex"
                : "hidden"
            } items-center justify-center text-lg`}
          >
            <BiUserCheck className="text-xl" />
          </button>
          <HintTooltip
            details={"Assign Ticket/s"}
            positions={{
              horizontal: `left-0`,
              vertical: `bottom-[-110%]`,
            }}
          />
        </div>

        {/**Delete Ticket ================================= */}
        <div className="relative group">
          <button
            onClick={() => {
              setActionPanel(true);
            }}
            className={`dark:bg-[#182235] bg-slate-100 dark:focus:ring-slate-600 focus:ring-slate-400  hover:translate-y-[-1px] duration-300 transition-all h-8 w-9 rounded-sm  text-red-600  font-semibold  border dark:border-slate-700 border-slate-400 ${
              deleteArray.length >= 1 && activeUser[0]?.access === "admin"
                ? "flex"
                : "hidden"
            } items-center justify-center text-lg`}
          >
            <BiTrash />
          </button>
          <HintTooltip
            details={"Delete ticket/s"}
            positions={{
              horizontal: `left-0`,
              vertical: `bottom-[-110%]`,
            }}
          />
        </div>

        {/**Mark All ================================= */}
        <button
          className={`dark:bg-[#182235] bg-slate-100 dark:focus:ring-slate-600 focus:ring-slate-400 hover:translate-y-[-1px] duration-300 transition-all h-8 w-9 rounded-sm  flex items-center justify-center  border dark:border-slate-700 border-slate-400  ${
            deleteArray.length >= 1 && activeUser[0]?.access === "admin"
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
                e.target?.checked === true ? markAll() : setDelete([])
              }
              className={`dark:bg-slate-800 bg-slate-200 dark:focus:ring-slate-600 focus:ring-slate-400 hover:opacity-80 h-4 w-4 rounded-sm  text-blue-600 cursor-pointer font-semibold custom-shadow  items-center justify-center text-lg hidden`}
              type="checkbox"
              name="selectAll"
              id="selectAll"
            />
            <BiSelectMultiple />
          </label>
        </button>

        {/**Agent List to assign ============= */}
        {activeUser[0]?.access === "admin" && (
          <div
            ref={assigneeRef}
            className={`h-[15.5rem] w-[12.5rem] dark:bg-slate-900 bg-white shadow-2xl drop-shadow-2xl backdrop-blur-sm px-2 border border-slate-400 dark:border-slate-700 rounded-sm absolute left-0 top-12 z-[99] overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-2 pt-2 ${
              contactsPanel ? "" : "hidden"
            }`}
          >
            <div className="flex sticky top-0 border-b border-slate-400 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-2xl h-8 items-center justify-center ">
              <BiSearchAlt className="absolute left-3 dark:text-slate-400 text-slate-700 font-semibold" />
              <input
                className="w-full h-8 bg-transparent rounded-lg dark:text-slate-400 text-slate-700 text-sm md:px-10  dark:placeholder-slate-400 placeholder:text-slate-700 border-0 focus:outline-none outline-none  focus:ring-0 transition-h duration-300"
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
      <div className="relative group">
        <button
          onClick={() => {
            setModal(user[0]?.name !== "User Loader" ? true : false);
            setValues(initialDraft());
            document.body.style.overflow = "hidden";
          }}
          className={`bg-slate-800 dark:bg-blue-700 capitalize text-white h-8 px-4 space-x-1 rounded-sm justify-center items-center text-xs font-base tracking-wide focus:outline-none outline-none duration-300 transition-bg font-medium hover:opacity-80 transition-all ${
            user[0]?.access === "client" ? "hidden" : "flex"
          }`}
        >
          <span>open new</span>
        </button>
        <HintTooltip
          details={"Open a new ticket"}
          positions={{
            horizontal: `right-0`,
            vertical: `bottom-[-110%]`,
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
