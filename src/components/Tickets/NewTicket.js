import React, { useMemo, useState } from "react";
import DueDate from "./DueDate";
import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "./../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import useClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { addRecording } from "./../authentication/Firebase";
import {
  BiTrash,
  BiCalendar,
  BiFile,
  BiPaperclip,
  BiX,
  BiMinus,
  BiMicrophone,
} from "react-icons/bi";

const NewTicket = ({ newTicketModal, setModal }) => {
  const contacts = useSelector((state) => state.Tickets.contacts);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const email_accounts = useSelector((state) => state.Tickets.email_accounts);
  const company_details = useSelector((state) => state.Tickets.company_details);
  const categories = useSelector((state) => state.Tickets.categories);
  const templates = useSelector((state) => state.Tickets.email_templates);
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const [recepient, setRecipient] = useState("");
  const [searchResults, setResults] = useState(false);
  const [showOpenedTickets, setShowOpen] = useState(true);
  const [recordingFile, setFile] = useState(false);
  const dispatch = useDispatch();
  const closeSuggestionsRef = useClickOutside(() => {
    setResults(false);
  });

  //Get Draft Message From the Local Storage ==============
  const initialDraft = () => {
    const draft = localStorage.getItem("draftMsg");
    return (
      JSON.parse(draft) || {
        recipient_name: "",
        recipient_email: "",
        agent: "",
        priority: "",
        category: "",
        branch_company: "",
        message: "",
        state: "",
        date: "",
        ticket_id: "",
        agent_email: "",
        complainant_name: "",
        complainant_email: "",
        complainant_number: "",
        send_as: "",
      }
    );
  };

  //Form Input Values =========================
  const [inputValue, setValues] = useState(initialDraft);

  //Check If Ticket Exists ===================
  const numbersArray = useMemo(() => {
    return allTickets.length >= 1 && inputValue.complainant_number !== ""
      ? allTickets.filter(
          (ticket) =>
            ticket.message_position === 1 &&
            ticket.complainant_number.includes(
              inputValue.complainant_number
            ) === true &&
            inputValue.complainant_number.split("").length >= 9
        )
      : [];
  }, [allTickets, inputValue.complainant_number]);
  const exist =
    numbersArray.length >= 1 &&
    numbersArray.map((data, index) => {
      return (
        <li
          key={index}
          className={`text-xs text-slate-600 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-1 border-b dark:border-slate-700 border-slate-300 capitalize leading-5`}
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
          } text-xs dark:text-slate-400 text-slate-600 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-1 border-b  dark:border-slate-700 border-slate-300 capitalize`}
        >
          <abbr title={contact.branch_company}>{contact.branch_company}</abbr>
        </li>
      );
    });

  const categoriesList =
    categories &&
    categories.map((catagory, index) => {
      return (
        <option
          className="capitalize hover:opacity-80"
          value={catagory}
          key={index}
        >
          {catagory}
        </option>
      );
    });

  //Submit New Ticket ===============
  const handleSubmit = (e) => {
    e.preventDefault();

    //Send SMS ===========================================
    /*var xhr = new XMLHttpRequest(),
      body = JSON.stringify({
        messages: [
          {
            channel: "whatsapp",
            to: "27732341215",
            content: `${inputValue.message}`,
          },
          {
            channel: "sms",
            to: "27732341215",
            content: `${inputValue.message}`,
          },
        ],
      });
    xhr.open("POST", "https://platform.clickatell.com/v1/message", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "KuUgDS0pSiOYrnltdo0opA==");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("success");
      }
    };
    xhr.send(body);*/

    // Upload Recordings
      recordingFile &&
      addRecording(recordingFile, `/dial_n_dine/${inputValue.ticket_id}`);

    let dueDate = `${new Date(inputValue.date).toLocaleString()}`;
    let openDate = `${new Date().toLocaleString()}`;

    //Alert if Due Date is Empty =============
    inputValue.date === "" &&
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Add The Due Date to Proceed",
            color: "bg-yellow-200",
          },
        ])
      );

    //Send Mail and Open Ticket If values are not empty
    /*if (!recordingFile && inputValue.state === "solved") {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please Upload The Recording To Proceed",
            color: "bg-yellow-200",
          },
        ])
      );
    } */

    //Sending Account =============================
    let sendingAccount = email_accounts.filter(
      (account) =>
        account.name.toLowerCase() === inputValue.send_as.toLowerCase()
    )[0];

    if (
      inputValue.date !== "" &&
      sendingAccount !== undefined &&
      inputValue.branch_company !== "" &&
      member_details.id !== false &&
      (allTickets.length >= 1 &&
      allTickets.filter((ticket) => ticket.ticket_id === inputValue.ticket_id)
        .length <= 0)
    ) {
      //Open New Ticket ========================
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
        inputValue.complainant_number,
        inputValue.send_as,
        `${recordingFile && inputValue.state === "solved" ? true : false}`
      );

      //Send Email Using Nodemailer ===================
      fetch("https://dndhelp-desk-first.herokuapp.com/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          from: `${sendingAccount.email}`,
          company: `${company_details.name} ${sendingAccount.name}`,
          password: sendingAccount.password,
          host: sendingAccount.host,
          port: sendingAccount.port,
          email: inputValue.recipient_email,
          subject: inputValue.category,
          ticket_id: inputValue.ticket_id,
          email_body:
            inputValue.state !== "solved"
              ? `<p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
        Hi ${inputValue.recipient_name},
      </p>
      <h1 style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;font-size:15px">
        <b>Dial & Dine has opened a new ticket regarding ${inputValue.category}. The case details are as follows:</b>
      </h1>
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
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    <b>Dial & Dine has opened a new ticket with ID: ${inputValue.ticket_id} which has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.</b>
  </h1>
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
      setValues({
        recipient_name: "",
        recipient_email: "",
        agent: "",
        priority: "",
        category: "",
        branch_company: "",
        message: "",
        state: "",
        date: "",
        ticket_id: "",
        agent_email: "",
        complainant_name: "",
        complainant_email: "",
        complainant_number: "",
        send_as: "",
      });
      setFile("");
      setShowOpen(true);
      setRecipient("");
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
    }
  };

  //Component =====================================
  return (
    <div
      className={`fixed top-[-0.5rem] left-[-0.5rem] bottom-[-0.5rem] right-[-0.5rem] bg-[#030d2769] rounded-lg justify-center ${
        newTicketModal === true ? "flex z-[999]" : "hidden"
      }`}
    >
      <div className="container w-[90%] md:w-full 2xl:w-[72rem] h-screen max-h-[45rem] flex justify-end px-6 pt-[6.8rem] pb-2 overflow-hidden overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={`w-[98%] lg:w-[58%] min-h-[20rem] h-[20rem] lg:h-full dark:bg-slate-800 bg-slate-100 border-2 border-slate-300 dark:border-slate-700 shadow drop-shadow rounded-xl overflow-hidden ${
            newTicketModal === true ? "flex" : "hidden"
          } flex-col justify-between space-y-1`}
        >
          {/**Close Modal or Minimuze and save window ============= */}
          <div className="absolute right-1 top-1 flex space-x-1 items-center z-[999]">
            {/**Minimize and save */}
            <abbr title="minimize and save">
              <span
                onClick={() => {
                  setModal(false);
                  window.localStorage.setItem(
                    "draftMsg",
                    JSON.stringify(inputValue)
                  );
                }}
                className="h-4 w-4 rounded-md flex items-center justify-center dark:bg-slate-700  bg-slate-200  hover:opacity-80 transition-all cursor-pointer"
              >
                <BiMinus className="dark:text-slate-300 text-slate-500 text-lg" />
              </span>
            </abbr>
            {/**Close and Clear  */}
            <abbr title="Close">
              <span
                onClick={() => {
                  setModal(false);
                  window.localStorage.setItem(
                    "draftMsg",
                    JSON.stringify({
                      recipient_name: "",
                      recipient_email: "",
                      agent: "",
                      priority: "",
                      category: "",
                      branch_company: "",
                      message: "",
                      state: "",
                      date: "",
                      ticket_id: "",
                      agent_email: "",
                      complainant_name: "",
                      complainant_email: "",
                      complainant_number: "",
                      send_as: "",
                    })
                  );
                  setValues({
                    recipient_name: "",
                    recipient_email: "",
                    agent: "",
                    priority: "",
                    category: "",
                    branch_company: "",
                    message: "",
                    state: "",
                    date: "",
                    ticket_id: "",
                    agent_email: "",
                    complainant_name: "",
                    complainant_email: "",
                    complainant_number: "",
                    send_as: "",
                  });
                  setFile(false);
                }}
                className="h-4 w-4 rounded-md flex items-center justify-center dark:bg-slate-700  bg-slate-200 hover:bg-red-300 dark:hover:bg-red-500 transition-all cursor-pointer"
              >
                <BiX className="dark:text-slate-300 text-slate-500 text-lg" />
              </span>
            </abbr>
          </div>

          {/**Top Section ============================= */}
          <div className="w-full h-[90%] flex flex-col p-4">
            <div className="w-full flex-[2] flex md:flex-col flex-row justify-between md:items-center">
              <div className="w-full md:h-10 flex flex-col md:flex-row md:justify-between md:items-center">
                {/**Recipient Name ============================= */}
                <label
                  htmlFor="to"
                  autoComplete="off"
                  className="md:w-[48%] h-8 flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>To : </span>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    placeholder="Contact ..."
                    required={true}
                    autoComplete="off"
                    value={recepient}
                    onKeyPress={() => setResults(true)}
                    onKeyDown={() => setResults(true)}
                    onFocus={() => setResults(true)}
                    onChange={(e) => {
                      setRecipient(e.target.value);
                    }}
                    className="h-8 w-[80%] md:w-[85%]  bg-transparent dark:text-slate-400 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 dark:placeholder:text-slate-400 placeholder:text-slate-500 focus:ring-0 focus:border-0 text-sm"
                  />
                  <ul
                    ref={closeSuggestionsRef}
                    className={`${
                      searchResults ? "" : "hidden"
                    } absolute top-9 h-[11rem] w-full shadow-2xl drop-shadow-2xl dark:bg-slate-800 bg-slate-200 rounded-md overflow-y-scroll no-scrollbar z-[999] no-scrollbar::-webkit-scrollbar p-2 space-y-2 border dark:border-slate-700 border-slate-400`}
                  >
                    {contactsList}
                  </ul>{" "}
                </label>
                {/**Subject ============================= */}
                <label
                  htmlFor="subject"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Subject :</span>
                  <select
                    className="h-8 w-[80%] md:w-[73%] p-2 pt-1  dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm"
                    id="subject"
                    name="subject"
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
                      Subject ...
                    </option>
                    {categoriesList}
                  </select>
                </label>
              </div>
              {/**Priority & Status ============================= */}
              <div className="w-full md:h-10 flex flex-col md:flex-row md:justify-between md:items-center">
                {/**Priority  ======================================== */}
                <label
                  htmlFor="priority"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Priority :</span>
                  <select
                    className="h-8 w-[80%] md:w-[75%] p-2 pt-1 dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm"
                    id="priority"
                    name="priority"
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
                {/**Status  ======================================== */}
                <label
                  htmlFor="status"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Status :</span>
                  <select
                    className="h-8 w-[80%] md:w-[75%] p-2 pt-1 dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm"
                    id="status"
                    name="status"
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
                      Status ...
                    </option>
                    <option className="capitalize" value="open">
                      open
                    </option>
                    <option className="capitalize" value="on hold">
                      on hold
                    </option>
                    <option className="capitalize" value="solved">
                      first Contact Resolution
                    </option>
                  </select>
                </label>
              </div>
              {/**Complaintant Details ============================= */}
              <div className="w-full md:h-10 flex flex-col md:flex-row md:justify-between md:items-center">
                {/**Complainat Email  ======================================== */}
                <label
                  htmlFor="email"
                  autoComplete="off"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Email :</span>
                  <input
                    className="h-8 w-[80%] md:w-[75%] p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm dark:placeholder:text-slate-400 placeholder:text-slate-500"
                    type="email"
                    id="email"
                    name="email"
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
                {/**Complainant Number  ======================================== */}
                <label
                  htmlFor="numbers"
                  autoComplete="off"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Phone :</span>
                  <input
                    className="h-8 w-[80%] md:w-[75%] p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm dark:placeholder:text-slate-400 placeholder:text-slate-500"
                    id="numbers"
                    name="numbers"
                    type="text"
                    autoComplete="nope"
                    placeholder="073 5698 625"
                    required={true}
                    pattern="^[0-9]{10}$"
                    value={inputValue.complainant_number}
                    onChange={(e) => {
                      setValues({
                        ...inputValue,
                        complainant_number: e.target.value,
                        ticket_id:
                          allTickets.length >= 1 &&
                          allTickets.filter(
                            (ticket) =>
                              ticket.ticket_id ===
                              `#${(
                                new Date().getSeconds() +
                                (new Date().getTime() +
                                  e.target.value
                                    .split("")
                                    .splice(3, 5)
                                    .join(""))
                              )
                                .split("")
                                .slice(9, 14)
                                .join("")}`
                          ).length <= 0
                            ? `#${(
                                new Date().getSeconds() +
                                (new Date().getTime() +
                                  e.target.value
                                    .split("")
                                    .splice(3, 5)
                                    .join(""))
                              )
                                .split("")
                                .slice(9, 14)
                                .join("")}`
                            : `#${
                                (
                                  new Date().getSeconds() +
                                  (new Date().getTime() +
                                    e.target.value
                                      .split("")
                                      .splice(3, 5)
                                      .join(""))
                                )
                                  .split("")
                                  .slice(9, 14)
                                  .join("") + 1
                              }`,
                        agent: member_details[0].name,
                        agent_email: member_details[0].email,
                      });
                    }}
                  />
                  <ul
                    className={`${
                      numbersArray.length >= 1 && showOpenedTickets
                        ? ""
                        : "hidden"
                    } absolute top-12 left-0 h-[12rem] w-full shadow-2xl bg-slate-200 border z-[999] rounded-lg overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar p-4 space-y-2`}
                  >
                    {exist}
                    <label
                      className="absolute bg-transparent top-[-0.5rem] right-2 outline-none focus:outline-none hover:opacity-80"
                      htmlFor="suggestion"
                    >
                      <input
                        type="checkbox"
                        name="suggestion"
                        id="suggestion"
                        onChange={() => setShowOpen(false)}
                        className="rounded checked:bg-slate-700"
                      />
                    </label>
                  </ul>
                </label>
              </div>
              {/**Complainant Name And Send As ============================= */}
              <div className="w-full md:h-10 flex flex-col md:flex-row md:justify-between md:items-center">
                {/**Complainant Name =========================================== */}
                <label
                  htmlFor="email"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Name :</span>
                  <input
                    className="h-8 w-[80%] md:w-[80%] p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm dark:placeholder:text-slate-400 placeholder:text-slate-500"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Complainant Name ..."
                    value={inputValue.complainant_name}
                    required={true}
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        complainant_name: e.target.value,
                        agent: member_details[0].name,
                        agent_email: member_details[0].email,
                      })
                    }
                  />
                </label>
                {/**Select Team */}
                {/**Send AS  ======================================== */}
                <label
                  htmlFor="priority"
                  className="md:w-[48%] flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-500 text-sm font-semibold relative"
                >
                  <span>Send As :</span>
                  <select
                    className="h-8 w-[80%] md:w-[72%] p-2 pt-1 dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 border-0 border-b dark:border-slate-700 border-slate-300 outline-none focus:outline-none focus:border-b focus:border-slate-400 focus:ring-0 focus:border-0 text-sm"
                    id="priority"
                    name="priority"
                    value={inputValue.send_as}
                    required={true}
                    onChange={(e) =>
                      setValues({
                        ...inputValue,
                        send_as: e.target.value,
                      })
                    }
                  >
                    <option className="capitalize" value="">
                      Send As ...
                    </option>
                    {email_accounts.length >= 1 &&
                      email_accounts.map((team) => {
                        return (
                          <option
                            key={team.id}
                            className="capitalize"
                            value={team.name}
                          >
                            {team.name}
                          </option>
                        );
                      })}
                  </select>
                </label>
              </div>
            </div>
            {/**Message ====================================== */}
            <div className="w-full h-full flex-[5] md:h-[65%] lg:h-[70%] mt-4 rounded-xl">
              <label htmlFor="message" className="w-full h-full">
                <textarea
                  className="resize-none w-full h-full bg-transparent rounded-xl  text-sm dark:placeholder:text-slate-400 placeholder:text-slate-500 border dark:border-slate-700 border-slate-300 overflow-hidden dark:text-slate-300 text-slate-700 focus:ring-0 focus:border-slate-300 outline-none focus:outline-none"
                  placeholder="Type your message here ..."
                  id="message"
                  name="message"
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
          </div>

          {/**Bottom Controls ========================================= */}
          <div className="dark:bg-slate-700 bg-slate-200 min-h-[3rem] h-[9%] md:h-[8%] w-full p-2 px-4 flex justify-between items-center overflow-hidden select-none">
            <div className="flex justify-center items-center">
              {/**Reset Input ========================================= */}
              <abbr title="Clear Inputs">
                <span
                  onClick={() => {
                    setValues({
                      recipient_name: "",
                      recipient_email: "",
                      agent: "",
                      priority: "",
                      category: "",
                      branch_company: "",
                      message: "",
                      state: "",
                      date: "",
                      ticket_id: "",
                      agent_email: "",
                      complainant_name: "",
                      complainant_email: "",
                      complainant_number: "",
                      send_as: "",
                    });
                    setFile(false);
                  }}
                  className="h-10 w-10 flex justify-center items-center outline-none focus:outline-none hover:opacity-80 rounded-xl text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  <BiTrash />
                </span>
              </abbr>
              {/**Attach A file ========================================= */}
              <abbr title="Attachment">
                <label
                  htmlFor="attachment"
                  className="h-10 w-10 flex justify-center items-center outline-none focus:outline-none hover:opacity-80 rounded-xl text-slate-600 dark:text-slate-400"
                >
                  <BiPaperclip />
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    className="hidden"
                  />
                </label>
              </abbr>
            </div>
            <div className="flex items-center space-x-2">
              {/**Templates ========================================= */}
              <div
                id="email"
                className="w-8 h-8 group flex items-center justify-center text-slate-600 cursor-pointer dark:text-slate-400 rounded-xl border dark:border-slate-600 border-slate-300"
              >
                <abbr title="Templates">
                  <BiFile />
                </abbr>
                <div className="fixed hidden group-hover:flex p-4 bottom-14 min-h-[10rem] w-[13rem] rounded-xl shadow-md dark:bg-slate-700 bg-slate-200 dark:border-slate-700 border-slate-200 after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-[5.6rem] after:mb-[-17px] after:border-[13px] after:border-r-transparent after:border-b-transparent after:border-l-transparent dark:after:border-t-slate-700 after:border-slate-200">
                  <ul className="h-full w-full flex flex-col justify-center space-y-2 overflow-hidden overflow-y-scroll dark:text-slate-300 text-slate-600 text-sm px-1">
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <li
                            onClick={() =>
                              setValues({
                                ...inputValue,
                                message:
                                  templates.length >= 1
                                    ? templates.filter(
                                        (template) =>
                                          template.name
                                            .split(" ")
                                            .join("")
                                            .replace(/\(/g, "")
                                            .replace(/\)/g, "")
                                            .toLowerCase() ===
                                          category
                                            .split(" ")
                                            .join("")
                                            .replace(/\(/g, "")
                                            .replace(/\)/g, "")
                                            .toLowerCase()
                                      )[0].message
                                    : "",
                              })
                            }
                            className="capitalize hover:opacity-80"
                            value={category}
                            key={index}
                          >
                            {category}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              {/**Upload Recordings ========================================= */}
              <abbr title="Upload Your Recording">
                <div className="w-8 h-8 border border-slate-300 dark:border-slate-600 rounded-xl flex justify-center items-center">
                  <label
                    htmlFor="recording"
                    className="w-full h-full flex justify-center items-center text-base text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    <BiMicrophone className="text-lg" />
                    <input
                      type="file"
                      id="recording"
                      name="recording"
                      accept=".wav"
                      value={recordingFile ? recordingFile.filename : ""}
                      title="Upload Recording"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      className="outline-none focus:outline-none hidden"
                    />
                  </label>
                </div>
              </abbr>
              {/**Due date ========================================= */}
              <abbr title="Due Time">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 border dark:border-slate-600 border-slate-300">
                  <BiCalendar className="absolute" />
                  <DueDate setValues={setValues} inputValue={inputValue} />
                </div>
              </abbr>
              {/**Send ========================================= */}
              <abbr title="Open Ticket">
                <button
                  type="submit"
                  className="h-8 w-28 flex justify-center items-center outline-none focus:outline-none bg-slate-800 dark:bg-blue-700 hover:opacity-80 rounded-md text-slate-100 dark:text-slate-100 font-medium text-sm font-sans transition-all"
                >
                  Submit now
                </button>
              </abbr>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
