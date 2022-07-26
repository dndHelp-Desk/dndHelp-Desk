import { FC, useState, useRef } from "react";
import { TbAddressBook, TbUsers, TbTicket } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { RootState } from "../../Redux/store";
import placeHolder from "./images/searchHolder.svg";
import { setThreadId } from "../../Redux/Slices/Tickets_n_Settings_Slice";

type Props = {
  option: string;
  setOption: any;
  searchOpen: boolean;
  setSearch: any;
  searchValue: any;
  setValue: any;
};

const UniversalSearch: FC<Props> = ({
  option,
  setOption,
  searchOpen,
  setSearch,
  searchValue,
  setValue,
}) => {
  const dispatch = useDispatch();
  const [currentView, setView] = useState<any>(null);
  const allContacts = useSelector((state: RootState) => state.Tickets.contacts);
  const fetchedTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const [contactsResults, setContactsResults] = useState<any>([]);
  const [ticketsResults, setTicketsResults] = useState<any>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeSearch = useOnClickOutside(() => {
    setSearch(false);
    setView(null);
    setValue("");
  });

  //Search shorcut Event Listener =======
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key === "k") || e.key === "K") {
      e.preventDefault();
      setSearch(true);
      searchRef.current !== null && searchRef && searchRef.current.focus();
    }
  });

  //Search Function ================
  const searchFunc = () => {
    allContacts.length >= 1 && searchValue?.length >= 2
      ? setContactsResults(
          allContacts.filter(
            (contact) =>
              contact.branch_company
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              contact?.name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              contact?.phone
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true
          )
        )
      : setContactsResults([]);
    fetchedTickets.length >= 1 && searchValue?.length >= 2
      ? setTicketsResults(
          fetchedTickets.filter(
            (ticket) =>
              ticket.branch_company
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              ticket?.complainant_number
                ?.toString()
                .replace(/\s/g, "")
                .includes(searchValue?.toString().replace(/\s/g, "")) ===
                true ||
              ticket?.ticket_id
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              ticket?.recipient_name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              ticket?.complainant_name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              ticket?.agent_name
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true
          )
        )
      : setTicketsResults([]);
  };

  //Component ========================
  return (
    <div
      ref={closeSearch}
      className={`relative hidden md:block ${
        searchOpen ? "z-[99999] shadow-2xl drop-shadow-2xl" : ""
      }`}
    >
      {/**Serchch Area ======================= */}
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          searchFunc();
        }}
      >
        <label
          htmlFor="searchAll"
          className="relative text-slate-700 dark:text-slate-300"
        >
          <input
            onFocus={() => {
              setSearch(true);
            }}
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
            value={searchValue}
            autoComplete="off"
            type="search"
            name="searchAll"
            id="searchAll"
            ref={searchRef}
            className="h-9 w-[15rem] bg-white dark:bg-slate-800 outline-none focus:outline-none focus:ring-0 border-b-2 border-0 border-slate-300 dark:border-slate-700 focus:border-b-blue-600 dark:focus:border-b-blue-600 dark:placeholder:text-slate-300 placeholder:text-slate-600  transition-all p-1 px-2 pr-10 text-xs font-semibold dark:font-medium font-sans"
            placeholder="Quick Search ..."
          />
          <button type="submit" className="outline-none focus:outline-none">
            <BiSearchAlt className="absolute right-2 top-1 text-slate-600 dark:text-slate-400 text-xl" />
          </button>
        </label>
      </form>
      {/**Serchch Area ======================= */}
      <div
        className={`absolute top-10 z-[99999] h-[15rem] w-[25rem] rounded-sm shadow-2xl bg-white dark:bg-slate-700 border border-slate-400 dark:border-slate-600 px-2 ${
          searchOpen ? "" : "hidden"
        }`}
      >
        {/**Top Navigation ========================== */}
        <div
          role="navigation"
          className="h-9 w-full grid grid-cols-4 dark:text-slate-400 text-slate-500 text-xs"
        >
          <button
            onClick={() => {
              setOption("all");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "all"
                ? "border-b-2 dark:border-slate-300 border-slate-700 dark:text-slate-100 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <span>All</span>
          </button>
          <button
            onClick={() => {
              setOption("contacts");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "contacts"
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-100 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbAddressBook className="text-lg" />
            <span>Contacts</span>
          </button>
          <button
            onClick={() => {
              setOption("tickets");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "tickets"
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-100 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbTicket className="text-lg" />
            <span>Tickets</span>
          </button>
          <button
            onClick={() => {
              setOption("users");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "users"
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-100 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbUsers className="text-lg" />
            <span>Users</span>
          </button>
        </div>
        {/**Top Navigation ========================== */}

        {/**Main Component ========================== */}
        <div className="h-[10.3rem] w-full overflow-hidden overflow-y-scroll px-2 space-y-1 pt-3">
          {/**Place holder ==== */}
          {contactsResults?.length <= 0 && ticketsResults?.length <= 0 && (
            <div className="mt-3 w-full flex flex-col items-center">
              <img className="w-28 h-24" src={placeHolder} alt="placeholder" />
              <h2 className="text-slate-400 dark:taxt-slate-600 text-sm font-sans">
                Press enter to search
              </h2>
            </div>
          )}
          {/**Place holder ==== */}

          {/**Contacts List =================== */}
          {(option === "all" || option === "contacts") &&
            contactsResults?.map((contact: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  setView(contact);
                  setOption("contacts");
                }}
                className={`w-full h-8 bg-slate-100 dark:bg-slate-750 rounded-sm flex items-center space-x-1 whitespace-nowrap overflow-hidden overflow-ellipsis px-2 dark:text-slate-300 text-slate-800 text-xs font-sans tracking-wider relative cursor-pointer hover:opacity-80 transition-all ${
                  currentView === contact
                    ? "border-l-2 border-slate-700 dark:border-slate-400 bg-slate-200 dark:bg-slate-800"
                    : "bg-slate-100 dark:bg-slate-750"
                }`}
              >
                <TbAddressBook className="text-lg" />
                <span>{contact?.branch_company}</span>
              </div>
            ))}

          {/**Tickets List =================== */}
          {(option === "all" || option === "tickets") &&
            ticketsResults?.map((ticket: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  setView(ticket);
                  setOption("tickets");
                }}
                className={`w-full h-8 rounded-sm flex items-center space-x-1 whitespace-nowrap overflow-hidden overflow-ellipsis px-2 dark:text-slate-300 text-slate-800 text-xs font-sans tracking-wider relative cursor-pointer hover:opacity-80 transition-all ${
                  currentView === ticket
                    ? "border-l-2 border-slate-700 dark:border-slate-400 bg-slate-200 dark:bg-slate-800"
                    : "bg-slate-100 dark:bg-slate-750"
                }`}
              >
                <TbTicket className="text-lg" />
                <span>{ticket?.category}</span>&nbsp; ||{" "}
                <span>{ticket?.ticket_id}</span>
              </div>
            ))}
          {/**Results List =================== */}
        </div>

        {/**More Details ======== */}
        <div
          className={`absolute top-0 left-[102%] h-[18rem] w-[18rem] bg-white dark:bg-slate-700 border border-slate-400 dark:border-slate-600 rounded px-2 ${
            !currentView ? "hidden" : "flex"
          } flex flex-col items-center space-y-4 shadow-2xl drop-shadow-2xl`}
        >
          <div className="h-10 w-[calc(100%+1rem)] mx-[-0.5rem] border-b dark:border-slate-600 border-slate-300 flex justify-end items-center p-1">
            <Link
              to={
                option === "contacts"
                  ? "/app/contacts"
                  : option === "tickets"
                  ? "/app/tickets"
                  : "/app/tickets"
              }
              onClick={() => {
                if (option === "contacts") {
                  window.localStorage.setItem(
                    "contactSearch",
                    searchValue?.toLowerCase().replace(/\s/g, "")
                  );
                  setSearch(false);
                  setView(null);
                } else if (option === "tickets") {
                  dispatch(setThreadId(currentView?.ticket_id));
                  window.localStorage.setItem(
                    "threadId",
                    JSON.stringify(currentView?.ticket_id)
                  );
                  setSearch(false);
                  setView(null);
                  setValue("");
                }
              }}
            >
              <div className="h-7 px-4 dark:bg-slate-750 bg-slate-200 dark:text-slate-400 text-slate-700 font-sans text-sm flex justify-center items-center rounded-sm hover:opacity-80 transition-all border border-slate-300 dark:border-slate-600">
                View
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center px-4 p-2 pt-0 h-[13.5rem] w-full overflow-hidden overflow-y-scroll">
            {option === "contacts" ? (
              <div className="w-full space-y-2">
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 capitalize">
                  <div className="w-full underline">Name</div>
                  <div className="w-full text-xs">{currentView?.name}</div>
                </div>
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2">
                  <div className="w-full underline capitalize">Email</div>
                  <div className="w-full text-xs lowercase">
                    {currentView?.email?.split(/[/,]/)?.map((email: any) => {
                      return (
                        <div key={email} className="break-all">
                          {email}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 capitalize">
                  <div className="w-full underline">Phone</div>
                  <div className="w-full text-xs">
                    {currentView?.phone?.split(/[/,]/)?.map((num: any) => {
                      return (
                        <div key={num} className="break-all">
                          {num}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : option === "tickets" ? (
              <div className="w-full space-y-2">
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 capitalize">
                  <div className="w-full underline">Open Date</div>
                  <div className="w-full text-xs">
                    {new Date(
                      currentView?.date ? currentView?.date : ""
                    )?.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 capitalize">
                  <div className="w-full underline">Company Name</div>
                  <div className="w-full text-xs">
                    {currentView?.branch_company}
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2">
                  <div className="w-full underline capitalize">Assignee</div>
                  <div className="w-full text-xs capitalize">
                    {currentView?.assignee}
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 capitalize">
                  <div className="w-full underline">Customer's Details</div>
                  <div className="w-full text-xs">
                    Name : {currentView?.complainant_name}
                  </div>
                  <div className="w-full text-xs">
                    Phone : {currentView?.complainant_number}
                  </div>
                  <div className="w-full text-xs">
                    Email : {currentView?.complainant_email}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/**Footer ============ */}
        <div className="h-9 w-[calc(100%+1rem)] mx-[-0.5rem] flex space-x-2 justify-between items-center p-1 px-2 border-t border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-750">
          <span className="text-slate-700 dark:text-slate-400 text-xs font-sans tracking-wider">
            Shortcut
          </span>
          <div className="text-slate-700 dark:text-slate-400 text-xs font-mono font-semibold">
            <kbd className="p-1 xp-2 bg-slate-200 dark:bg-slate-800 rounded-sm">
              Ctrl
            </kbd>{" "}
            <b>+</b>{" "}
            <kbd className="p-1 px-2 bg-slate-200 dark:bg-slate-800 rounded-sm">
              K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalSearch;
