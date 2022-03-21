import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newContact } from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "./../../store/NotificationsSlice";
import {
  BsFillTelephoneFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsPinMapFill,
} from "react-icons/bs";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const NewContact = ({ contactModal, setModal }) => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const contactRef = useOnClickOutside(() => {
    setModal(false);
  });
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
      updateAlert([
        ...alerts,
        {
          message: "New Contact Has Been Added Successfully",
          color: "bg-green-200",
        },
      ])
    );
    setValue({
        name: "",
        email: "",
        phoneNumber: "",
        company: "",
      },
    );
    setModal(false);
  };

  //Component ==========
  return (
    <div
      className={`bg-[#0813227e] fixed w-full h-full z-[999] ${
        contactModal ? "flex" : "hidden"
      }  justify-center pt-28 top-[-0.5rem] bottom-0 left-0 right-0 min-h-screen w-screen`}
    >
      {/**Add new Contact =========================================== */}
      <div
        ref={contactRef}
        className="h-[35em] w-[25rem] dark:bg-slate-900 bg-slate-100 border border-slate-500 flex justify-center rounded-xl p-6 shadow-2xl"
      >
        <form
          action=""
          onSubmit={(e) => handleNewContact(e)}
          className="space-y-6 h-full w-full max-w-[23rem] flex flex-col items-center justify-center mt-2 dark:autofill:bg-slate-900"
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
              type="text"
              name="email"
              id="email"
              autoComplete="nope"
              placeholder="One email or multiple seperated by commas ..."
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
  );
};

export default NewContact;
