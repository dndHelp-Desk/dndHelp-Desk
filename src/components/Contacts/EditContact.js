import React, { useState,useEffect } from "react";
import {
  BsFillTelephoneFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { editContact } from "././../Data_Fetching/TicketsnUserData";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector } from "react-redux";

const EditContact = ({ edit, setEdit, selectedArray }) => {
  const allContacts = useSelector((state) => state.Tickets.contacts);
  const closeCanvasRef = useOnClickOutside(() => {
    setEdit(false);
  });
  const [newContactValue, setValue] = useState({
    name:"",
    email:"",
    phoneNumber:"",
  });

  useEffect(() => {
    allContacts.length >= 1 &&
      selectedArray.length >= 1 &&
      setValue({
        name: allContacts.filter(
          (contact) => contact.id === selectedArray[0]
        )[0].name,
        email: allContacts.filter(
          (contact) => contact.id === selectedArray[0]
        )[0].email,
        phoneNumber: allContacts.filter(
          (contact) => contact.id === selectedArray[0]
        )[0].phone,
      });
  },[allContacts,selectedArray]);

  //Submit ===============
  let ticketId = selectedArray[0];
  const saveContact = (e) => {
    e.preventDefault();
    editContact(
      ticketId,
      newContactValue.name,
      newContactValue.phoneNumber,
      newContactValue.email
    );
    setValue({
      name: "",
      email: "",
      phoneNumber: "",
    });
  };

  //Component =========================
  return (
    <div
      ref={closeCanvasRef}
      className={`fixed right-0 top-0 bottom-0 flex justify-center h-full dark:bg-[#1e293bde] bg-slate-50 backdrop-blur-sm shadow-2xl pt-28 p-4 ${
        edit ? "z-[999]" : "hidden z-[-999]"
      } transition-all`}
    >
      <div
        className={`h-full flex flex-col items-center gap-2 w-full ${
          edit ? "" : "hidden"
        } transition-all`}
      >
        <form
          action=""
          onSubmit={(e) => saveContact(e)}
          className="space-y-6 h-full w-full max-w-[23rem] flex flex-col items-center mt-2 dark:autofill:bg-slate-900"
        >
          <h3 className="text-lg text-center dark:text-slate-400 text-slate-500 capitalize font-bold font-sans">
            edit contact
          </h3>
          <div className="h-11 w-full min-w-[15rem] rounded-md dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Fullname ..."
              required
              onChange={(e) =>
                setValue({ ...newContactValue, name: e.target.value })
              }
              value={newContactValue.name}
              className="bg-transparent w-full h-full rounded-md dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-md dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="nope"
              required
              placeholder="Valid Email ..."
              onChange={(e) =>
                setValue({ ...newContactValue, email: e.target.value })
              }
              value={newContactValue.email}
              className="bg-transparent w-full h-full rounded-md dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 top-4 text-sm left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-md dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded-md dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200 custom-shadow "
            />
            <BsFillTelephoneFill className="absolute text-slate-500 top-4 text-sm left-4" />
          </div>
          <button
            type="submit"
            className="bg-blue-700 min-w-[8rem] h-10 px-6 rounded-md flex justify-center items-center text-slate-300  text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:bg-blue-800 duration-300 transition-bg font-semibold"
          >
            Edit Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
