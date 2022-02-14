import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsSearch,
  BsFillTrashFill,
  BsPinFill,
  BsFillTelephoneFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsPinMapFill,
} from "react-icons/bs";
import { deleteContact } from "../Data_Fetching/TicketsnUserData";
import { newContact } from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "./../../store/NotificationsSlice";

const ContactsComponent = () => {
  const contacts = useSelector((state) => state.Tickets.contacts);
  const dispatch = useDispatch();
  const [searchResults, setResults] = useState("");
  const [newContactValue, setValue] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
  });

  //Add new Contact  =======================
  const handleNewContact = (e) => {
    e.preventDefault();
    newContact(
      newContactValue.name,
      newContactValue.email,
      newContactValue.phoneNumber,
      newContactValue.company
    );
    dispatch(
      updateAlert({
        message: "New Contact Has Been Added Successfully",
        color: "bg-green-200",
      })
    );
    setValue({
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
    });
  };

  //Loop Through Each Contact =========================
  const contactList =
    contacts.length >= 1 &&
    contacts.map((contact) => {
      return (
        <div
          key={contact.id}
          autoComplete="off"
          className={`h-[13rem] col-span-1 rounded-xl dark:bg-[#25396823] bg-slate-200 custom-shadow overflow-hidden relative w-full p-4 grid grid-rows-5 gap-2 items-center ${
            contact.branch_company
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchResults.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          {/**Delete Button ============================ */}
          <button
            onClick={() => {
              deleteContact(contact.id);
            }}
            className={`h-8 w-8 dark:text-slate-500 text-slate-400 dark:hover:text-red-600 hover:text-red-600 rounded-lg flex items-center justify-center outline-none focus:outline-none absolute top-2 text-lg right-2`}
          >
            <BsFillTrashFill />
          </button>

          {/**div Contents =========== */}
          <div className="row-span-2 m-auto dark:bg-slate-900 bg-slate-300 h-16 w-16 rounded-full flex items-center justify-center uppercase tracking-wide dark:text-slate-500 text-slate-500 text-xl font-bold border-2 dark:border-slate-500 border-slate-400 custom-shadow">
            {contact.name.split(" ")[0].split("")[0]}
            {contact.name.split(" ")[1].split("")[0]}
          </div>
          <div className="row-span-2 flex flex-col space-y-1 items-center">
            <p className="dark:text-slate-400 text-slate-500 text-sm capitalize w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center font-semibold">
              {contact.name}
            </p>
            <p className="text-slate-500 text-xs font-medium lowercase w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center italic">
              {contact.email}
            </p>
            <p className="text-slate-500 text-xs font-medium capitalize w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
              {contact.branch_company}
            </p>
          </div>
          <div className="row-span-1 flex justify-center space-x-2 items-center">
            <abbr title={contact.branch_company}>
              <div className="h-9 w-9 dark:bg-slate-900 bg-slate-300 hover:text-blue-700 hover:border-blue-700 rounded-xl flex justify-center items-center text-slate-500 font-bold text-base custom-shadow cursor-pointer border border-slate-500">
                <BsPinFill />
              </div>
            </abbr>
            <abbr title={contact.phone}>
              <div className="h-9 w-9 dark:bg-slate-900 bg-slate-300 hover:text-blue-700 hover:border-blue-700 rounded-xl flex justify-center items-center text-slate-500 font-bold text-base custom-shadow  cursor-pointer border border-slate-500">
                <BsFillTelephoneFill />
              </div>
            </abbr>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="dbg-transparent mt-4 min-h-[40rem] w-[90%] space-y-4 sm:w-full rounded-xl container 2xl:w-[72rem] overflow-hidden flex flex-col items-center pt-2">
      {/**Search Menu ======================================== */}
      <div className="h-12 w-[70%] min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Quick Search ..."
          onChange={(e) => setResults(e.target.value)}
          value={searchResults}
          className="bg-transparent w-full h-full rounded-xl dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500"
        />
        <BsSearch className="absolute text-slate-500 text-lg top-4 left-4" />
      </div>

      {/**Conatct List ============= */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {/**Contacts List ======================================== */}
        <div className="col-span-2 overflow-hidden items-center flex flex-col gap-4 pt-1">
          {/**Contacts ======================================== */}
          <div className="h-[38rem] dark:bg-slate-900 bg-slate-100 p-4 grid grid-cols-3 gap-4 w-full rounded-xl overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            {contactList}
          </div>
        </div>

        {/**Add new Contact =========================================== */}
        <div className="col-span-1 dark:bg-slate-900 bg-slate-100  rounded-xl p-6">
          <form
            action=""
            onSubmit={(e) => handleNewContact(e)}
            className="space-y-6 h-full w-full flex flex-col items-center justify-center mt-2 dark:autofill:bg-slate-900"
          >
            <h3 className="text-lg text-center dark:text-slate-400 text-slate-500 capitalize font-bold font-sans">
              add new contact
            </h3>
            <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="nope"
                placeholder="Fullname ..."
                onChange={(e) =>
                  setValue({ ...newContactValue, name: e.target.value })
                }
                value={newContactValue.name}
                className="bg-transparent w-full h-full rounded-xl dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
              />
              <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
            </div>
            <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="nope"
                placeholder="Valid Email ..."
                onChange={(e) =>
                  setValue({ ...newContactValue, email: e.target.value })
                }
                value={newContactValue.email}
                className="bg-transparent w-full h-full rounded-xl dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
              />
              <BsFillEnvelopeFill className="absolute text-slate-500 top-4 text-sm left-4" />
            </div>
            <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
              <input
                type="tel"
                name="number"
                id="number"
                autoComplete="off"
                onChange={(e) =>
                  setValue({ ...newContactValue, phoneNumber: e.target.value })
                }
                value={newContactValue.phoneNumber}
                placeholder="Phone Number ..."
                className="bg-transparent w-full h-full rounded-xl dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
              />
              <BsFillTelephoneFill className="absolute text-slate-500 top-4 text-sm left-4" />
            </div>
            <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="nope"
                placeholder="Company Name ..."
                onChange={(e) =>
                  setValue({ ...newContactValue, company: e.target.value })
                }
                value={newContactValue.company}
                className="bg-transparent w-full h-full rounded-xl dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
              />
              <BsPinMapFill className="absolute text-slate-500 top-[0.85rem] text-base left-4" />
            </div>
            <button
              type="submit"
              className="bg-blue-700 min-w-[8rem] h-10 px-6 rounded-lg flex justify-center items-center text-slate-300  text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:bg-blue-800 duration-300 transition-bg font-semibold"
            >
              Add Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactsComponent;
