import React, { useState } from "react";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "./../../store/NotificationsSlice";
import useClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const NewTicket = ({ newTicketModal, setModal }) => {
  const contacts = useSelector((state) => state.Tickets.contacts);
  const settings = useSelector((state) => state.Tickets.settings);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const categories = settings.length >= 1 && settings[0].categories;
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const alerts = useSelector((state) => state.NotificationsData.alert);
  const [recepient, setRecipient] = useState("");
  const [searchResults, setResults] = useState(false);
  const dispatch = useDispatch();
  const closeModalRef = useOnClickOutside(() => {
    setModal(false);
  });
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
    ticket_id:"",
    agent_email: member_details.length !== undefined && member_details[0].email,
    complainant_name: "",
    complainant_email: "",
    complainant_number: "",
  });

  //Check If Ticket Exists ===================
  const numbersArray =
    allTickets.length >= 1 ?
    allTickets.filter(
      (ticket) =>
        ticket.message_position === 1 &&
        ticket.complainant_number.includes(inputValue.complainant_number) ===
          true
    ):[];
  const exist = numbersArray.length >= 1 && numbersArray.map((data, index) => {
    return (
      <li
        key={index}
        className={`text-xs text-slate-600 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-1 border-b border-slate-400 capitalize leading-5`}
      >
        <span>
          {data.branch_company} : {data.ticket_id}
        </span>
        <br />
        <span>
          {new Date(data.date).toDateString()}, {data.due_date.split("T")[1]}
        </span>
        <br />
        <span>Agent Name : {data.agent_name}</span>
        <br />
        <span>Status : {data.status}</span>
      </li>
    );
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
            setResults(false);
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
  /*const sendMailAPI =
    "https://script.google.com/macros/s/AKfycbyAWRBiPB0UcqtL4a6qGySTScYj-VwecLpqOI_eQAJUUkPZMj--RNw-lY9uD_F7EXhg/exec?action=addData";*/

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
    /*fetch(sendMailAPI, {
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
    );*/

    //Send Email Using Nodemailer ===================
    let dueDate = `${new Date(
      inputValue.date
    ).toDateString()}, ${new Date().getHours()}:${
      new Date().getMinutes() + 1
    } hrs`;
    let openDate = `${new Date().toDateString()}, ${new Date().getHours()}:${
      new Date().getMinutes() + 1
    } hrs`;
    if (member_details.id !== false) {
      fetch("https://dndhelp-desk-first.herokuapp.com/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue.recipient_email,
          subject: inputValue.category,
          ticket_id: inputValue.ticket_id,
          email_body:
            inputValue.state !== "solved"
              ? `<p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
        Hi ${inputValue.recipient_name},
      </p>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
        Dial & Dine has opened a new ticket regarding ${inputValue.category}. The case details are as follow:
      </p>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Tickect Details:</b>
      </p>
      <ul style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
        <li><b>Brand:</b> ${inputValue.branch_company} </li>
        <li><b>Tickect-ID:</b> ${inputValue.ticket_id} </li>
        <li><b>Due Date:</b> ${dueDate} </li>
        <li><b>Case Origin:</b> dndHelp-Desk </li>
        <li><b>Priority:</b> ${inputValue.priority} </li>
        <li><b>Opened By:</b> ${inputValue.agent} </li>
        </ul>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Customer's Details:</b>
      </p>
      <ul style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;">
        <li><b>Full Name:</b> ${inputValue.complainant_name}</li>
        <li><b>Email Address:</b> ${inputValue.complainant_email} </li>
        <li><b>Phone Number:</b> ${inputValue.complainant_number}</li>
        </ul>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Case Detail:</b>
      </p>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
        ${inputValue.message}
      </p>
      <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
        <i>In order to update or respond to this issue please click the button below,</i>
      </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
       <i> <a target="_blank" href="https://www.dndhelp-desk.co.za/support">You can alternatively click here.</a></i>
      </p>
      <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href="https://www.dndhelp-desk.co.za/support">Update or Respond Here</a></button>
<p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;">
        <b>Disclaimer</b>
      </p>
  <p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
        The information contained in this communication from the sender is confidential. It is intended solely for use by the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any disclosure, copying, distribution or taking action in relation of the contents of this information is strictly prohibited and may be unlawful. 
      </p>`
              : `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
     Hi ${inputValue.recipient_name},
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    Dial & Dine has opened a new ticket with ID: ${inputValue.ticket_id} which has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${inputValue.branch_company}
    </li>
    <li><b>Tickect-ID:</b>
      ${inputValue.ticket_id}
    </li>
    <li><b>Closed On:</b>
      ${openDate}
    </li>
    <li><b>Status:</b>
      Resolved
    </li>
  </ul>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Resolution:</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    ${inputValue.message}
  </p>
  <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i>In order to update or respond to this issue please click the button below,</i>
  </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i> <a target="_blank" href="https://www.dndhelp-desk.co.za/support">You can alternatively click here.</a></i>
  </p>
  <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href="https://www.dndhelp-desk.co.za/support">Update or Respond Here</a></button>
  <p
    style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;">
    <b>Disclaimer</b>
  </p>
  <p
    style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    The information contained in this communication from the sender is confidential. It is intended solely for use by
    the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any
    disclosure, copying, distribution or taking action in relation of the contents of this information is strictly
    prohibited and may be unlawful.
  </p>`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const resData = data;
          if (resData.status === "success") {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: "Email sent Successfully",
                  color: "bg-green-200",
                },
              ])
            );
          } else if (resData.status === "fail") {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: "Email Failed To Send",
                  color: "bg-red-200",
                },
              ])
            );
          }
        });
      setModal(false);
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "New Ticket Created Successfully",
            color: "bg-green-200",
          },
        ])
      );
  };
    setValues({
      recipient_name: "",
      recipient_email: "",
      agent: member_details.id !== false && member_details[0].name,
      priority: "",
      category: "",
      branch_company: "",
      message: "",
      state: "",
      date: "",
      ticket_id: "",
      agent_email:
        member_details.length !== undefined && member_details[0].email,
      complainant_name: "",
      complainant_email: "",
      complainant_number: "",
    });
    }

  //Component ===========================
  return (
    <div
      className={`fixed ${
        newTicketModal === true ? "fixed flex z-[999]" : "hidden"
      } top-[-0.5rem] left-0 bottom-0 right-0 min-h-screen w-screen bg-[#030d2769] justify-center overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar pt-14`}
    >
      <div className="h-full w-full justify-center overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar  flex">
        <div
          ref={closeModalRef}
          className="bg-slate-400 border border-slate-600 shadow-2xl w-[95%] sm:w-[35rem] h-fit rounded-md relative py-4 "
        >
          <h3 className="text-center text-slate-900 text-base font-extrabold uppercase mt-2">
            Create A New Ticket
          </h3>
          {/**New Tickect Form ================================= */}
          <form className="px-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="py-6 space-y-4">
              <div className="flex justify-between space-x-4">
                {/**Reciepient Name  ======================================== */}
                <label className="w-[50%] relative">
                  <input
                    className="
                      block
                      w-full h-9
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                   placeholder:text-slate-500
                      rounded-md
                      border-slate-300
                      shadow-sm
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    type="text"
                    value={recepient}
                    placeholder="Restuarant ..."
                    required={true}
                    onKeyPress={() => setResults(true)}
                    onKeyDown={() => setResults(true)}
                    onFocus={() => setResults(true)}
                    onChange={(e) => {
                      setRecipient(e.target.value);
                    }}
                  />
                  <ul
                    ref={closeSuggestionsRef}
                    className={`${
                      searchResults ? "" : "hidden"
                    } absolute top-12 left-0 h-[11rem] w-full shadow-2xl bg-slate-200 border border-slate-400 rounded-lg overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar p-2 space-y-2`}
                  >
                    {contactsList}
                  </ul>
                </label>
                {/**End Of Reciepient Name  ======================================== */}
                <label className="block w-[50%]">
                  <select
                    className="
                      block
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    value={inputValue.category}
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
                <label className="block w-[50%]">
                  <select
                    className="block
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    value={inputValue.priority}
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
                <label className="block w-[50%]">
                  <select
                    className="
                     w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    value={inputValue.state}
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
                    <option className="capitalize">open</option>
                    <option className="capitalize">on hold</option>
                    <option className="capitalize">solved</option>
                  </select>
                </label>
                {/**End  Of Priority and Status  ======================================== */}
              </div>
              {/**complainant Details ======================================== */}
              <div className="flex justify-between space-x-4">
                <label className="block w-[50%]">
                  <input
                    type="text"
                    className="
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    value={inputValue.complainant_email}
                    autoComplete="nope"
                    placeholder="Complainant Email"
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        complainant_email: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="block w-[50%] relative">
                  <input
                    type="text"
                    className="
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    autoComplete="off"
                    placeholder="073 5698 625"
                    required={true}
                    pattern="^[0-9]{10}$"
                    value={inputValue.complainant_number}
                    onChange={(e) => {
                      setValues({
                        ...inputValue,
                        complainant_number: e.target.value,
                        ticket_id: `#${(new Date().getSeconds() +(new Date().getTime()+ e.target.value.split("").splice(3, 5).join(""))).split("").slice(9,14).join("")}`,
                      });
                    }}
                  />
                  <ul
                    className={`${
                      numbersArray.length >= 1 ? "" : "hidden"
                    } absolute top-12 left-0 h-[12rem] w-full shadow-2xl bg-slate-200 border border-slate-400 rounded-lg overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar p-2 space-y-2`}
                  >
                    {exist}
                  </ul>
                </label>
              </div>
              <div className="flex justify-between space-x-4">
                <label className="block w-full">
                  <span className="text-slate-700 text-sm font-bold"></span>
                  <input
                    type="text"
                    className="
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
                      rounded-md
                      border-slate-300
                      shadow-sm
                  capitalize
                      focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                    "
                    placeholder="Complainant Name ..."
                    value={inputValue.complainant_name}
                    required={true}
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        complainant_name: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              {/**End of complainant Details ======================================== */}
              <label className="block">
                <input
                  type="datetime-local"
                  className="
                      w-full
                      mt-1
                  text-slate-600
                   text-sm
                   bg-slate-200
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
                <textarea
                  className="resize-none
                        w-full h-full
                        mt-1
                    text-slate-600
                     text-sm
                     bg-slate-200
                        rounded-md
                        border-slate-300
                        shadow-sm
                    capitalize
                        focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                      "
                  placeholder="Type your message here ..."
                  required={true}
                  rows="5"
                  value={inputValue.message}
                  onChange={(e) =>
                    setValues({
                      ...inputValue,
                      message: e.target.value,
                    })
                  }
                ></textarea>
              </label>
            </div>
            <div className="w-full h-10 flex justify-center">
              <button
                type="submit"
                className="px-14 p-2 bg-slate-900 hover:bg-slate-800 outline-none focus:outline-none focus:ring focus:ring-slate-600 text-slate-300 rounded-md font-bold uppercase text-sm"
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
