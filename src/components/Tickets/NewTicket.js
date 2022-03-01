import React, { useState } from "react";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "./../../store/NotificationsSlice";
import useClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const NewTicket = ({ newTicketModal, setModal }) => {
  const closeModalRef = useOnClickOutside(() => {
    setModal(false);
  });
  const contacts = useSelector((state) => state.Tickets.contacts);
  const settings = useSelector((state) => state.Tickets.settings);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const categories = settings.length >= 1 && settings[0].categories;
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const [recepient, setRecipient] = useState("");
  const [searchResults, setResults] = useState(false);
  const dispatch = useDispatch();
  const closeSuggestionsRef = useClickOutside(() => {
    setResults(false);
  });

  //Form Input Values =========================
  const [inputValue, setValues] = useState({
    recipient_name: "",
    recipient_email: "",
    agent: member_details.id !== false && member_details[0].name,
    priority: "",
    category: "",
    branch_company: "",
    message: "",
    state: "",
    date: "",
    ticket_id: "#0" + (filteredTickets.length + 1),
    agent_email: member_details.length !== undefined && member_details[0].email,
    complainant_name: 0,
    complainant_email: 0,
    complainant_number: 0,
  });

  //Reciepents or contacts list suggetions =================================
  const contactsList =
    contacts.length >= 1 &&
    contacts.map((contact, index) => {
      let clientName = contact.name;
      let clientEmail = contact.email;
      let brand = contact.branch_company;
      return (
        <li
          key={index}
          onClick={() => {
            setValues({
              ...inputValue,
              recipient_name: clientName,
              recipient_email: clientEmail,
              branch_company: brand,
            });
            setRecipient(brand);
          }}
          className={`${
            contact.branch_company
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(recepient.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          } text-xs text-slate-600 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-1 border-b border-slate-300 capitalize`}
        >
          <abbr title={contact.branch_company}>{contact.branch_company}</abbr>
        </li>
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

  //Link Google Appscript API for sendind Emails Regarding new Ticket ================
  const sendMailAPI =
    "https://script.google.com/macros/s/AKfycbyAWRBiPB0UcqtL4a6qGySTScYj-VwecLpqOI_eQAJUUkPZMj--RNw-lY9uD_F7EXhg/exec?action=addData";

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
      inputValue.date,
      inputValue.ticket_id,
      inputValue.agent_email,
      inputValue.complainant_name,
      inputValue.complainant_email,
      inputValue.complainant_number
    );

    //Send Mail Using App Script ======================
    fetch(sendMailAPI, {
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
        priority: inputValue.priority,
        opened_by: inputValue.agent,
        ticket_id: inputValue.ticket_id,
        brand: inputValue.branch_company,
        date: `${new Date(inputValue.date).toDateString()}, ${
          new Date().getHours() + 1
        }:${new Date().getMinutes() + 1} hrs`,
        complainant_name: inputValue.complainant_name,
        complainant_email: inputValue.complainant_email,
        complainant_number: inputValue.complainant_number,
      }),
    });
    setModal(false);
    dispatch(
      updateAlert({
        message: "New Ticket Created Successfully",
        color: "bg-green-200",
      })
    );

    //Send Email Using Nodemailer ===================
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: inputValue.recipient_name,
        email: inputValue.recipient_email,
        subject: inputValue.category,
        message: inputValue.message,
        priority: inputValue.priority,
        opened_by: inputValue.agent,
        ticket_id: inputValue.ticket_id,
        brand: inputValue.branch_company,
        date: `${new Date(inputValue.date).toDateString()}, ${
          new Date().getHours() + 1
        }:${new Date().getMinutes() + 1} hrs`,
        complainant_name: inputValue.complainant_name,
        complainant_email: inputValue.complainant_email,
        complainant_number: inputValue.complainant_number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const resData = data;
        if (resData.status === "success") {
          dispatch(
            updateAlert({
              message: "New Ticket Created Successfully",
              color: "bg-green-200",
            })
          );
          alert("Message Sent");
        } else if (resData.status === "fail") {
          dispatch(
            updateAlert({
              message: "Email Failed To Send",
              color: "bg-red-200",
            })
          );
        }
      });
  };

  //Component ===========================
  return (
    <div
      className={`fixed ${
        newTicketModal === true ? "fixed flex z-[999]" : "hidden"
      } top-[-3rem] left-0 right-0 h-[110%] w-screen bg-[#030d2769] justify-center overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar pt-28`}
    >
      <div className="h-full w-full justify-center overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar  flex">
        <div
          ref={closeModalRef}
          className="bg-slate-300 shadow-2xl w-3/5 max-w-[50rem] h-[47rem] rounded-md relative py-4 "
        >
          <h3 className="text-center slate-900 text-lg font-bold">
            New Ticket
          </h3>
          {/**New Tickect Form ================================= */}
          <form className="px-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="py-6 space-y-4">
              <div className="flex justify-between space-x-4">
                {/**Reciepient Name  ======================================== */}
                <label className="block w-[40%] relative focus:bg-red-500">
                  <span className="text-slate-700 text-sm font-bold">
                    Recipient / Contact
                  </span>
                  <input
                    className="
                      block
                      w-full h-9
                      mt-1
                  text-slate-600
                   text-sm
                      rounded-md
                      border-slate-300
                      shadow-sm
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    type="text"
                    value={recepient}
                    placeholder="Brand Name ..."
                    required={true}
                    onKeyPress={() => setResults(true)}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                  <ul
                    ref={closeSuggestionsRef}
                    className={`${
                      searchResults ? "" : "hidden"
                    } absolute top-18 left-0 h-[10rem] w-full shadow-2xl bg-slate-200 border border-slate-400 rounded-lg overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar p-2 space-y-2`}
                  >
                    {contactsList}
                  </ul>
                </label>
                {/**End Of Reciepient Name  ======================================== */}
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
                {/**End Of Subject  ======================================== */}
              </div>
              <div className="flex justify-between space-x-4">
                {/**Priority And Status  ======================================== */}
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
                  <span className="text-slate-700 text-sm font-bold">
                    Status
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
                        state: e.target.value,
                      })
                    }
                  >
                    <option className="capitalize" value="">
                      State ...
                    </option>
                    <option className="capitalize">Open</option>
                    <option className="capitalize">on hold</option>
                    <option className="capitalize">Closed</option>
                    <option className="capitalize">Resolved</option>
                  </select>
                </label>
                {/**End  Of Priority and Status  ======================================== */}
              </div>
              {/**complainant Details ======================================== */}
              <div className="flex justify-between space-x-4">
                <label className="block w-[40%]">
                  <span className="text-slate-700 text-sm font-bold">
                    Complainant Email
                  </span>
                  <input
                    type="text"
                    className="
                      mt-1
                      block
                      w-full
                  text-slate-600
                   text-sm
                      rounded-md
                      border-slate-300
                      shadow-sm
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-slate-400 placeholder:text-xs
                    "
                    autoComplete="nope"
                    placeholder="email@example.com ..."
                    required={true}
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        complainant_email: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="block w-[40%]">
                  <span className="text-slate-700 text-sm font-bold">
                    Complainant Number
                  </span>
                  <input
                    type="text"
                    className="
                      mt-1
                      block
                      w-full
                  text-slate-600
                   text-sm
                      rounded-md
                      border-slate-300
                      shadow-sm
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-slate-400 placeholder:text-xs
                    "
                    autoComplete="off"
                    placeholder="+27 5698 6258 ..."
                    required={true}
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        complainant_number: e.target.value,
                      })
                    }
                  />
                </label>
                {/**End of complainant Details ======================================== */}
              </div>
              <label className="block">
                <span className="text-slate-700 text-sm font-bold">
                  Complainant Name
                </span>
                <input
                  type="text"
                  className="
                      mt-1
                      block
                      w-full
                  text-slate-600
                   text-sm
                      rounded-md
                      border-slate-300
                      shadow-sm
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-slate-400 placeholder:text-xs
                    "
                  placeholder="Full Name ..."
                  required={true}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      complainant_name: e.target.value,
                    })
                  }
                />
              </label>
              <label className="block">
                <span className="text-slate-700 text-sm font-bold">
                  Due Date
                </span>
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
                  Message / Case Details
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
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-slate-400 placeholder:text-xs
                    "
                  placeholder="Type your message here ..."
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
                className="px-6 p-2 bg-slate-900 hover:bg-slate-800 outline-none focus:outline-none focus:ring focus:ring-slate-600 text-slate-300 rounded-md font-bold uppercase text-sm"
              >
                Open
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
