import React, { useState } from "react";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "./../../store/NotificationsSlice";

const NewTicket = ({ newTicketModal, setModal }) => {
  const closeModalRef = useOnClickOutside(() => {
    setModal(false);
  });
  const contacts = useSelector((state) => state.Tickets.contacts);
  const settings = useSelector((state) => state.Tickets.settings);
  const categories = settings.length >= 1 && settings[0].categories;
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();

  //Form Input Values =========================
  const [inputValue, setValues] = useState({
    recipient_name: "",
    recipient_email: "",
    agent: member_details.length !== undefined && member_details[0].name,
    priority: "",
    category: "",
    branch_company: "",
    message: "",
    state: "",
    date: "",
  });

  const contactsList =
    contacts.length >= 1 &&
    contacts.map((contact, index) => {
      return (
        <option
          value={`${contact.name},${contact.email},${contact.branch_company}`}
          className="capitalize"
          key={index}
        >
          {contact.name}
        </option>
      );
    });

  const categoriesList =
    categories &&
    categories.map((catagory, index) => {
      return (
        <option className="capitalize" value={catagory} key={index}>
          {catagory}
        </option>
      );
    });

  //Link To new Tickect ================
  const link =
    "https://script.google.com/macros/s/AKfycbwuB68-q4HaoLldyWX7cat8GAIHZIbZ-V_uV_QAh9MH8WnVAhXhh7Wvyj5egmn72m02/exec";

  //Submit New Ticket ===============
  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket(
      inputValue.recipient_name,
      inputValue.recipient_email,
      inputValue.agent,
      inputValue.priority,
      inputValue.category,
      inputValue.branch_company,
      inputValue.message,
      inputValue.state,
      inputValue.date
    );
    fetch(link, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: inputValue.recipient_name,
        email: inputValue.recipient_email,
        subject: inputValue.category,
        message: inputValue.message,
        tickect_id: Math.random(10) * 10,
      }),
    });
    setModal(false);
    dispatch(
      updateAlert({
        message: "New Ticket Created Successfully",
        color: "bg-green-200",
      })
    );
  };

  //Component ===========================
  return (
    <div
      className={`fixed ${
        newTicketModal === true ? "flex" : "hidden"
      } top-0 left-0 right-0 min-h-[45rem] h-screen w-screen bg-[#030d2769] justify-center items-center`}
    >
      <div
        ref={closeModalRef}
        className="bg-slate-300 shadow-2xl w-3/5 max-w-[30rem] rounded-lg relative py-4"
      >
        <h3 className="text-center slate-900 text-lg font-bold">New Ticket</h3>

        {/**New Tickect Form ================================= */}
        <form className="px-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="py-6 space-y-4">
            <div className="flex justify-between space-x-4">
              <label className="block w-[40%]">
                <span className="text-slate-700 text-sm font-bold">
                  Recipient / Contact
                </span>
                <select
                  className="
                    block
                    w-full
                    mt-1
					text-slate-600
					 text-sm
                    rounded-md
                    border-slate-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                  required={true}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      recipient_name: e.target.value.split(",")[0],
                      recipient_email: e.target.value.split(",")[1],
                      branch_company: e.target.value.split(",")[2],
                    })
                  }
                >
                  <option className="capitalize" value="">
                    Contact ...
                  </option>
                  {contactsList}
                </select>
              </label>
              <label className="block w-[40%]">
                <span className="text-slate-700 text-sm font-bold">
                  Subject / Category
                </span>
                <select
                  className="
                    block
                    w-full
                    mt-1
					text-slate-600
					 text-sm
                    rounded-md
                    border-slate-300
                    shadow-sm
					capitalize
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                  required={true}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      category: e.target.value,
                    })
                  }
                >
                  <option className="capitalize" value="">
                    subject ...
                  </option>
                  {categoriesList}
                </select>
              </label>
            </div>
            <div className="flex justify-between space-x-4">
              <label className="block w-[40%]">
                <span className="text-slate-700 text-sm font-bold">
                  Priority
                </span>
                <select
                  className="
                    block
                    w-full
                    mt-1
					text-slate-600
					 text-sm
                    rounded-md
                    border-slate-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                  required={true}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      priority: e.target.value,
                    })
                  }
                >
                  <option className="capitalize" value="">
                    Priority ...
                  </option>
                  <option className="capitalize">Low</option>
                  <option className="capitalize">Medium</option>
                  <option className="capitalize">High</option>
                  <option className="capitalize">Urgent</option>
                </select>
              </label>
              <label className="block w-[40%]">
                <span className="text-slate-700 text-sm font-bold">Status</span>
                <select
                  className="
                    block
                    w-full
                    mt-1
					text-slate-600
					 text-sm
                    rounded-md
                    border-slate-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                  required={true}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      state: e.target.value,
                    })
                  }
                >
                  <option className="capitalize" value="">
                    State ...
                  </option>
                  <option className="capitalize">Open</option>
                  <option className="capitalize">Pending</option>
                  <option className="capitalize">Closed</option>
                  <option className="capitalize">Resolved</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-slate-700 text-sm font-bold">Due Date</span>
              <input
                type="date"
                className="
                    mt-1
                    block
                    w-full
					text-slate-600
					 text-sm
                    rounded-md
                    border-slate-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                required={true}
                onChange={(e) =>
                  setValues({
                    ...inputValue,
                    date: e.target.value,
                  })
                }
              />
            </label>
            <label className="block">
              <span className="text-slate-700 text-sm font-bold">
                Message / Description
              </span>
              <textarea
                className="
                    mt-1
                    block
                    w-full
					text-slate-600
					 text-sm
                    rounded-md
					resize-none
					h-[10rem]
                    border-slate-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "
                required={true}
                rows="5"
                onChange={(e) =>
                  setValues({
                    ...inputValue,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="px-6 p-2 bg-slate-900 hover:bg-slate-800 outline-none focus:outline-none focus:ring focus:ring-slate-600 text-slate-300 rounded-full font-bold uppercase text-sm"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
