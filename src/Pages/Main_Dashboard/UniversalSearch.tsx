import { FC, useState, useRef } from "react";
import { TbAddressBook, TbUser, TbTicket } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { RootState } from "../../Redux/store";
import placeHolder from "./images/searchHolder.svg";

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
  const [currentView, setView] = useState<any>(null);
  const allContacts = useSelector((state: RootState) => state.Tickets.contacts);
  const [contactsResults, setContactsResults] = useState<any>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeSearch = useOnClickOutside(() => {
    setSearch(false);
    setView(null);
    setValue("");
  });

  //Serach shorcut Event Listener =======
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key === "x") || e.key === "X") {
      setSearch(true);
      searchRef.current !== null && searchRef && searchRef.current.focus();
    }
  });

  //Search Function ================
  const searchFunc = () => {
    allContacts.length >= 1
      ? setContactsResults(
          allContacts.filter(
            (contact) =>
              contact.branch_company
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchValue?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              contact?.name
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue.toLowerCase().replace(/\s/g, "")) ===
                true ||
              contact?.phone
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(searchValue.toLowerCase().replace(/\s/g, "")) === true
          )
        )
      : setContactsResults([]);
  };

  //Component ========================
  return (
    <div
      ref={closeSearch}
      className={`relative ${
        searchOpen ? "z-[9999] shadow-2xl drop-shadow-2xl" : ""
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
            className="h-9 w-[20rem] bg-white dark:bg-slate-800 outline-none focus:outline-none focus:ring-0 border-b border-0 border-slate-300 dark:border-slate-700 focus:border-b-blue-600 dark:focus:border-b-blue-600 dark:placeholder:text-slate-300 placeholder:text-slate-600  transition-all p-1 px-2 pr-10 text-xs font-semibold dark:font-medium font-sans"
            placeholder="Quick Search ..."
          />
          <button type="submit" className="outline-none focus:outline-none">
            <BiSearchAlt className="absolute right-2 top-1 text-slate-600 dark:text-slate-400 text-xl" />
          </button>
        </label>
      </form>
      {/**Serchch Area ======================= */}
      <div
        className={`absolute top-10 z-[99999] h-[14rem] w-full rounded-sm shadow-2xl bg-white dark:bg-slate-700 border border-slate-400 dark:border-slate-600 ${
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
                ? "border-b-2 dark:border-slate-300 border-blue-600 dark:text-slate-300 text-slate-700 dark:font-medium font-semibold"
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
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-300 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbAddressBook className="text-lg" />
            <span>Contacts</span>
          </button>
          <button
            onClick={() => {
              setOption("users");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "users"
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-300 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbUser className="text-lg" />
            <span>Users</span>
          </button>
          <button
            onClick={() => {
              setOption("tickets");
            }}
            className={`h-full col-span-1 outline-none focus:outline-none flex justify-center items-center space-x-1 ${
              option === "tickets"
                ? "border-b-2 dark:border-slate-300 border-slate-800 dark:text-slate-300 text-slate-700 dark:font-medium font-semibold"
                : ""
            }`}
          >
            <TbTicket className="text-lg" />
            <span>Tickets</span>
          </button>
        </div>
        {/**Top Navigation ========================== */}

        {/**Main Component ========================== */}
        <div className="h-[9.4rem] w-full overflow-hidden overflow-y-scroll px-2 space-y-1 pt-3">
          {/**Place holder ==== */}
          {contactsResults?.length <= 0 && (
            <div className="mt-3 w-full flex flex-col items-center">
              <h2 className="text-slate-400 dark:taxt-slate-600 text-sm font-sans">
                Press enter to search
              </h2>
              <img className="h-20 mt-2" src={placeHolder} alt="placeholder" />
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
                }}
                className={`w-full h-8 bg-slate-200 dark:bg-slate-750 rounded-sm flex items-center space-x-1 whitespace-nowrap overflow-hidden overflow-ellipsis px-2 dark:text-slate-300 text-slate-800 text-xs font-sans tracking-wider relative cursor-pointer hover:opacity-80 transition-all`}
              >
                <TbAddressBook className="text-lg" />
                <span>{contact?.branch_company}</span>
              </div>
            ))}
          {/**Results List =================== */}
        </div>

        {/**More Details ======== */}
        <div
          className={`absolute top-0 left-[102%] h-[20rem] w-[18rem] bg-white dark:bg-slate-700 border border-slate-400 dark:border-slate-600 rounded ${
            !currentView ? "hidden" : "flex"
          } flex flex-col items-center space-y-4 shadow-2xl drop-shadow-2xl`}
        >
          <div className="h-10 w-full border-b dark:border-slate-600 border-slate-300 flex justify-end items-center p-1">
            <Link to="/">
              <div className="h-7 px-4 dark:bg-slate-750 bg-slate-200 dark:text-slate-400 text-slate-700 font-sans text-sm flex justify-center items-center rounded-sm hover:opacity-80 transition-all">
                View
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center px-4 p-2 border-b dark:border-slate-600 border-slate-300 h-[14rem] w-full overflow-hidden">
            <div className="h-10 w-10 rounded dark:bg-slate-750 bg-slate-200 border dark:border-slate-600 border-slate-300 flex justify-center items-center font-sans dark:font-medium font-semibold text-2xl dark:text-slate-200 text-slate-800">
              {currentView?.branch_company?.charAt(0)}
            </div>
            <ul className="w-full mt-4">
              <li className="mt-2 flex justify-between items-center overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 border-b dark:border-slate-600 border-slate-300 capitalize">
                <span className="w-2/5">Name</span>
                <span className="w-3/5 flex justify-end">
                  {currentView?.name.split("/")[0]}
                </span>
              </li>
              <li className="mt-2 flex justify-between items-center overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2 border-b dark:border-slate-600 border-slate-300">
                <span className="w-2/5">Email</span>
                <div className="w-3/5 h-fit flex justify-end  overflow-hidden px-1 text-xs italic">
                  <p className="break-all">{currentView?.email}</p>
                </div>
              </li>
              <li className="mt-2 flex justify-between items-center overflow-hidden dark:text-slate-300 text-slate-700 text-sm px-2">
                <span className="w-2/5">Phone</span>
                <div className="w-3/5 h-fit flex justify-end  overflow-hidden text-xs italic px-1">
                  <p className="break-all">{currentView?.phone}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/**Footer ============ */}
        <div className="h-9 w-full flex space-x-2 justify-between items-center p-1 border-t border-slate-300 dark:border-slate-600">
          <span className="text-slate-700 dark:text-slate-400 text-xs font-sans tracking-wider">
            Shortcut
          </span>
          <div className="text-slate-700 dark:text-slate-400 text-xs font-mono font-semibold">
            <kbd className="p-1 xp-2 bg-slate-200 dark:bg-slate-800 rounded-sm">
              Ctrl
            </kbd>{" "}
            <b>+</b>{" "}
            <kbd className="p-1 px-2 bg-slate-200 dark:bg-slate-800 rounded-sm">
              X
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalSearch;
