import React, { FC, useState, useEffect } from "react";
import {
  BsFillTelephoneFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { editContact } from "../../Adapters/Data_Fetching/TicketsnUserData";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";

interface Props {
  edit: any;
  setEdit: any;
  selectedArray: any;
}

const EditContact: FC<Props> = ({ edit, setEdit, selectedArray }) => {
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const allContacts = useSelector((state: RootState) => state.Tickets.contacts);
  const closeCanvasRef = useOnClickOutside(() => {
    setEdit(false);
  });
  const [newContactValue, setValue] = useState<any>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    allContacts?.length >= 1 &&
      selectedArray.length >= 1 &&
      setValue({
        name: allContacts?.filter(
          (contact) => contact.id === selectedArray[0]
        )[0]?.name,
        email: allContacts?.filter(
          (contact) => contact.id === selectedArray[0]
        )[0]?.email,
        phoneNumber: allContacts?.filter(
          (contact) => contact.id === selectedArray[0]
        )[0]?.phone,
      });
  }, [allContacts, selectedArray]);

  //Submit ===============
  let ticketId = selectedArray[0];
  const saveContact = (e: React.SyntheticEvent) => {
    e.preventDefault();
    editContact(
      ticketId,
      newContactValue.name,
      newContactValue.phoneNumber,
      newContactValue.email
    );
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: "Contact Edited Successfully",
          color: "bg-green-200",
          id: new Date().getTime(),
        },
      ])
    );
    setValue({
      name: "",
      email: "",
      phoneNumber: "",
    });
    setEdit(false);
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
          className="space-y-6 h-full w-[25rem] flex flex-col items-center mt-2 dark:autofill:bg-slate-900"
        >
          <h3 className="text-base text-center dark:text-slate-300 text-slate-800 uppercase font-bold font-sans">
            edit contact
          </h3>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="nope"
              required
              placeholder="Valid Email ..."
              onChange={(e) =>
                setValue({ ...newContactValue, email: e.target.value })
              }
              value={newContactValue.email}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 top-4 text-sm left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-[#25396823] bg-slate-200"
            />
            <BsFillTelephoneFill className="absolute text-slate-500 top-4 text-sm left-4" />
          </div>
          <button
            type="submit"
            className="text-slate-100 text-sm font-medium cursor-pointer outline-none focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray dark:bg-blue-700 bg-slate-800 transition duration-150 ease-in-out hover:-translate-y-1 h-10 px-4 rounded-sm flex items-center justify-center space-x-2"
          >
            Edit Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
