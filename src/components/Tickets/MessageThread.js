import React, { useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillTrashFill,
  BsThreeDotsVertical,
  BsChatRight,
  BsTypeItalic,
  BsTypeUnderline,
  BsCodeSlash,
} from "react-icons/bs";
import {
  BiPaperPlane,
  BiMicrophone,
  BiPaperclip,
} from "react-icons/bi";
import { HiCheck, HiOutlineArrowSmDown } from "react-icons/hi";
import noChatImg from "./images/email-open.svg";
import {
  addReply,
  deleteTicket,
  resolveTicket,
  changeStatus,
  reOpenTicket,
} from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import { addRecording } from "./../authentication/Firebase";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const MessageThread = ({ isChatOpen, audio }) => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const email_accounts = useSelector((state) => state.Tickets.email_accounts);
  const company_details = useSelector((state) => state.Tickets.company_details);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const [recordingFile, setFile] = useState(false);
  const user = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();
  const scrollToLastMessage = useRef();
  const scrollToNone = useRef();

  //Filter Thread Messages =====================================
  const threadMessage = useMemo(() => {
    return allTickets
      .filter((ticket) => ticket.ticket_id === threadId)
      .sort((a, b) => {
        return Number(a.message_position) - Number(b.message_position);
      });
  }, [allTickets, threadId]);

  //Thread First Message =====================
  const firstMessage = useMemo(() => {
    return (
      filteredTickets.length >= 1 &&
      filteredTickets.filter((ticket) => ticket.ticket_id === threadId)
        .length >= 1 &&
      filteredTickets.filter((ticket) => ticket.ticket_id === threadId)
    );
  }, [filteredTickets, threadId]);

  //Solution =========================
  const [solution, setSolution] = useState("");

  //Reply State and value ==================================
  const [reply, setReply] = useState({
    message: "",
    subject: "",
    status: firstMessage.length >= 1 ?firstMessage[0].status:"",
    message_position: threadMessage.length + 1,
    ticket_id: firstMessage.length >= 1 ? firstMessage.ticket_id : "none",
  });

  //Message options ========================================gi
  const [msgOptions, setOptions] = useState({
    status: false,
    id: "",
    threadId: "",
  });
  const msgOptionsRef = useOnClickOutside(() =>
    setOptions({ status: false, id: "", threadId: "" })
  );

  //Get Name of Reciepent and Agent and email ===============
  let clientName =
    user[0].access === "client"
      ? firstMessage.length >= 1 && firstMessage[0].agent_name
      : firstMessage.length >= 1 && firstMessage[0].recipient_name;
  let clientEmail =
    user[0].access === "client"
      ? firstMessage.length >= 1 && firstMessage[0].agent_email
      : firstMessage.length >= 1 && firstMessage[0].recipient_email;
  let brand = firstMessage.length >= 1 && firstMessage[0].branch_company;
  let ticket_status = firstMessage.length >= 1 && firstMessage[0].status;
  let date = firstMessage.length >= 1 && firstMessage[0].due_date;

  //Scroll to last message Function
  const lastMessage = () => {
    scrollToLastMessage.current &&
      scrollToLastMessage.current.scrollIntoView({ behavior: "smooth" });
  };

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessage.length >= 1 &&
    threadMessage.map((message, index) => {
      return (
        <div
          ref={
            threadMessage.length - 1 === index
              ? scrollToLastMessage
              : scrollToNone
          }
          key={index}
          className="w-full snap_childTwo text-slate-400 text-sm leading-6 flex transition-all"
        >
          {/**Message ====================== */}
          <div className="w-[95%] 2xl:w-full bg-tranparent border-l dark:border-slate-700 border-slate-400  px-6 pb-4 relative">
            <div className="absolute left-[-1rem] top-0 h-[2rem] w-[2rem] rounded-md dark:bg-slate-700 bg-slate-500 border-2 dark:border-[#1e293b] border-slate-200 dark:text-gray-300 text-slate-50 flex justify-center items-center capitalize font-bold text-sm">
              <BsChatRight />
            </div>
            {/**Contents ======================= */}
            <div className="w-full bg-transparent rounded-lg">
              <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                <div className="flex items-center dark:text-slate-300 text-slate-900">
                  <span>
                    {message.agent_name}
                    {message.user}
                  </span>
                  <span
                    className={`flex justify-end space-x-2 px-2 capitalize text-xs text-blue-600 italic ${
                      message.user_email === user[0].email ||
                      message.agent_email === user[0].email
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <span className="flex font-bold space-x-[1px] text-sm">
                      <HiCheck />
                      <HiCheck
                        className={`${
                          message.readStatus !== "read" ? "text-slate-500" : ""
                        }`}
                      />
                    </span>{" "}
                  </span>
                </div>{" "}
                <div className="flex space-x-0 md:space-x-2 h-full items-center justify-between">
                  <span className="flex space-x-2">
                    <span className="text-xs dark:text-slate-500 text-slate-500  font-medium">
                      {`${new Date(message.date).toLocaleString()}`}
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      user[0].access === "admin" &&
                      setOptions({
                        status: true,
                        id: message.message_position,
                        threadId: message.ticket_id,
                      })
                    }
                    className="h-8 w-8 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-500 text-slate-500 flex items-center justify-center outline-none focus:outline-none"
                  >
                    <BsThreeDotsVertical className="inline  cursor-pointer" />
                  </button>

                  {/**Message Options =========================== */}
                  <div
                    ref={msgOptionsRef}
                    className={`w-[10rem] ${
                      msgOptions.status === true &&
                      msgOptions.id === message.message_position &&
                      msgOptions.threadId === message.ticket_id
                        ? ""
                        : "hidden"
                    } z-[99] shadow-lg border dark:border-slate-800 border-slate-100 dark:bg-slate-700 bg-white backdrop-blur-sm rounded-lg absolute right-0 top-8 p-4`}
                  >
                    <h5 className="dark:text-slate-300 text-slate-500 font-semibold text-sm flex justify-between items-center">
                      <span>Delete</span>
                      <BsFillTrashFill
                        onClick={() => {
                          deleteTicket(message.id);
                          setOptions({
                            status: false,
                            id: "",
                            threadId: "",
                          });
                        }}
                        className="hover:text-red-500 cursor-pointer"
                      />
                    </h5>
                  </div>
                </div>
              </div>
              <p className="mt-2 py-2 dark:text-slate-400 text-slate-700 border dark:border-[#33415560] border-slate-300 p-2 rounded-lg">
                {message.message}
              </p>
            </div>
          </div>
        </div>
      );
    });

  //Send Solution send Solution ====================
  const sendSolution = () => {
    // Upload Recordings
    recordingFile !== false &&
      addRecording(recordingFile, `/dial_n_dine/${threadId}`);

    //Add ticket recording on firebase storage =============================
    resolveTicket(
      firstMessage.length >= 1 && firstMessage[0].id,
      solution,
      (recordingFile !== false ? true : false)
    );

    //Sending Account =============================
    let sendingAccount =
      firstMessage.length >= 1 &&
      email_accounts.filter(
        (account) =>
          account.name.toLowerCase() === firstMessage[0].team.toLowerCase()
      )[0];

    //Relpy Using Nodemailer ===================
    let closingTime = `${new Date().toDateString()}, ${new Date().getHours()}:${
      new Date().getMinutes() + 1
    } hrs`;

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
        email: clientEmail,
        subject: firstMessage.length >= 1 && firstMessage[0].category,
        ticket_id: threadId,
        email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
     Hi ${clientName},
  </p>
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
   <b> A ticket with ID: ${threadId} has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.</b>
  </h1>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${brand}
    </li>
    <li><b>Tickect-ID:</b>
      ${threadId}
    </li>
    <li><b>Closed On:</b>
      ${closingTime}
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
    ${solution}
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
                message: "Ticket has been resolved",
                color: "bg-green-200",
              },
            ])
          );
          setReply({ ...reply, message: "" });
        } else if (resData.status === "fail") {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Ticket Failed To Resolve",
                color: "bg-red-200",
              },
            ])
          );
        }
      });
    setSolution("");
    setReply({ ...reply, message: "",status:"" });
  };

  //Send Reply Function ============================
  const sendReply = (e) => {
    e.preventDefault();
    if (
      user[0].name !== "User Loader" &&
      reply.ticket_id !== "none" &&
      reply.status !== "" &&
      reply.status !== "solved"
    ) {
      addReply(
        reply.message,
        reply.message_position,
        reply.ticket_id,
        user[0].name,
        user[0].email,
        user[0].access,
        clientName,
        clientEmail,
        firstMessage.length >= 1 && firstMessage[0].team
      );

      //Sending Account =============================
      let sendingAccount =
        firstMessage.length >= 1 &&
        email_accounts.filter(
          (account) =>
            account.name.toLowerCase() === firstMessage[0].team.toLowerCase()
        )[0];

      //Relpy Using Nodemailer ===================
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
          email: clientEmail,
          subject: reply.subject,
          ticket_id: threadId,
          email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    Hi ${clientName},
  </p>
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
   <b> A ticket with ID: ${threadId} has been updated. In order to reply or update this issues please navigate to the link provided at the bottom, don't foget to grab your ticket-id.</b>
  </h1>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${brand}
    </li>
    <li><b>Tickect-ID:</b>
      ${threadId}
    </li>
    <li><b>Due Date:</b>
      ${
        new Date(date).toDateString() +
        " " +
        new Date().getHours() +
        1 +
        ":" +
        new Date().getMinutes() +
        1 +
        "hrs"
      }
    </li>
    <li><b>Status:</b>
      ${ticket_status}
    </li>
  </ul>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Feedback:</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    ${reply.message}
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
                  message: "Response Has Been Sent.",
                  color: "bg-green-200",
                },
              ])
            );
    setReply({ ...reply, message: "", status: "" });
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
    }
    if (reply.status === "solved") {
      sendSolution();
    setReply({ ...reply, message: "", status: "" });
    } else if (reply.status === "reopened") {
      reOpenTicket(firstMessage[0].id, reply.status, true);
    setReply({ ...reply, message: "", status: "" });
    } else if (
      reply.status !== "" &&
      reply.status !== "solved" &&
      reply.status !== "reopened"
    ) {
      changeStatus(firstMessage[0].id, reply.status);
    setReply({ ...reply, message: "", status: "" });
    }
    if (reply.status === "") {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please Select A Proper Status",
            color: "bg-yellow-200",
          },
        ])
      );
    }
  };

  //Component ======================================
  return (
    <div
      className={`h-[40rem] ${
        isChatOpen ? "flex" : "hidden"
      } lg:flex flex-col w-full lg:w-[60%] lg:rounded-r-lg rounded-md lg:rounded-none  bg-transparent`}
    >
      <div className="h-[30rem] w-full dark:bg-[#182235] bg-slate-200 border dark:border-[#33415596] border-[#94a3b8a8] rounded-none lg:rounded-tr-md px-2 pb-4 gap-4 flex flex-col overflow-hidden">
        <div className="h-14 bg-transparent sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-slate-800 border-slate-300">
          {/**Opened Ticket Details ================================== */}
          <div className="flex justify-between items-center w-full space-x-2 bg-transparent px-3">
            <details className="relative flex items-center space-x-2 outline-none focus:outline-none">
              <summary className="text-sm leading-6 dark:text-slate-300 text-slate-900 font-semibold font-sans select-none cursor-pointer outline-none focus:outline-none">
                Details
              </summary>

              <div className="absolute flex flex-col justify-between rounded-md top-8 left-[-1.5rem] h-[18rem] w-[25rem] md:w-[28rem] shadow-2xl drop-shadow-2xl dark:bg-slate-800 bg-slate-200 border border-slate-400 dark:border-slate-700 p-4  before:content-[''] before:absolute before:tooltip_bottom before:left-[0.6rem] before:h-[20px] before:w-[20px] before:bg-inherit before:border before:border-t-inherit before:border-l-inherit before:border-r-transparent before:border-b-transparent before:rotate-45">
                <div>
                  <h2 className="dark:text-slate-300 text-slate-700 text-sm font-semibold">
                    Ticket Details
                  </h2>
                  <ul className="dark:text-slate-400 text-slate-500 mt-2 space-y-4 capitalize">
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Open Date : </b>
                      {firstMessage.length >= 1 &&
                        new Date(firstMessage[0].date).toLocaleString()}{" "}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Assigned To : </b>
                      {firstMessage.length >= 1 && firstMessage[0].agent_name}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Brand/Company : </b>
                      {firstMessage.length >= 1 &&
                        firstMessage[0].branch_company}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>First Contact Resolution : </b>
                      {firstMessage.length >= 1 && firstMessage[0].fcr}{" "}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Complainant Name : </b>
                      {firstMessage.length >= 1 &&
                        firstMessage[0].complainant_name}{" "}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Complainant Number : </b>
                      {firstMessage.length >= 1 &&
                        firstMessage[0].complainant_number}{" "}
                    </li>
                    <li className="text-xs flex items-center justify-between border-b border-[#94a3b8a8] dark:border-slate-700">
                      <b>Complainant Email : </b>
                      <span className="lowercase">
                        {firstMessage.length >= 1 &&
                          firstMessage[0].complainant_email}{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </details>

            {/**Subject And Scroll To Last Message Details =========================== */}
            <div className="font-semibold text-sm dark:text-slate-300 text-slate-900 tracking-wide flex flex-col capitalize text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span className="uppercase text-xs">
                {firstMessage.length >= 1 && firstMessage[0].category}
                {!threadId && "Nothing is selected"}
              </span>{" "}
              {/**Scroll to Last Message ================== */}
              <button
                onClick={() => lastMessage()}
                className="outline-none focus:outline-none text-lg dark:text-slate-400 text-slate-700 capitalize flex items-center justify-end space-x-1"
              >
                <HiOutlineArrowSmDown />
                <span className="text-xs">Last Message</span>
              </button>
            </div>
          </div>
        </div>

        {/**Thread Messages ============================ */}
        <div className="h-full w-full p-6 overflow-y-scroll scroll-snap">
          {thread}
          {
            //Final Solution If there is one =====================
            firstMessage.length >= 1 && firstMessage[0].status === "solved" && (
              <div className="w-full snap_childTwo text-slate-400 text-sm leading-6 flex transition-all">
                {/**Message ====================== */}
                <div className="w-[95%] 2xl:w-full bg-tranparent border-l dark:border-slate-700 border-slate-400  px-6 pb-2 relative">
                  <div className="absolute left-[-1rem] top-0 h-[2rem] px-2 rounded-md dark:bg-slate-700 bg-slate-500 border-2 dark:border-[#1e293b] border-slate-200 dark:text-gray-300 text-slate-50 flex justify-center items-center font-medium tracking-widest uppercase text-[0.6rem]">
                    Solution
                  </div>
                  {/**Contents ======================= */}
                  <div className="w-full bg-transparent rounded-lg">
                    <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                      <div className="flex w-full h-full items-center justify-end pr-10 pt-2">
                        <span className="flex space-x-2">
                          <span className="text-xs dark:text-slate-500 text-slate-500  font-medium">
                            {`${new Date(
                              firstMessage.length >= 1 &&
                                firstMessage[0].closed_time
                            ).toLocaleString()}`}
                          </span>
                        </span>
                      </div>
                    </div>
                    <p className="mt-6 dark:text-slate-400 text-slate-700 capitalize border dark:border-[#33415560] border-slate-300 p-2 rounded-lg">
                      {firstMessage.length >= 1 && firstMessage[0].solution}
                    </p>
                    {/**Play Recording ================================ */}
                    {(firstMessage[0].hasRecording === true ||
                      firstMessage[0].hasRecording === "true") && (
                      <audio
                        id="rec"
                        controls
                        className="h-[2rem] w-full max-w-[18rem] mt-2 "
                        src={audio}
                        type="audio/wav"
                        preload="metadata"
                      >
                        <source src={audio} type="audio/ogg" />
                        <source src={audio} type="audio/mpeg" />
                        <source src={audio} type="audio/wav" />
                        <source src={audio} type="audio/mp3" />
                        Your browser does not support the
                        <code>audio</code> element.
                      </audio>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          {/**Placeholders ======================== */}
          {!threadId && (
            <>
              <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center mt-10 uppercase text-xs font-sans font-bold">
                select any ticket to start the conversation
              </h2>
              <img
                src={noChatImg}
                alt="No Ticket"
                className="w-full h-[15rem] mt-10 object-contain object-center"
              />
            </>
          )}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <div className="h-[10.1rem] w-full bg-transparent py-4 pt-6 flex items-center justify-center">
        <div className="h-full w-full relative shadow-sm rounded-lg dark:bg-[#182235] bg-slate-200 border border-[#94a3b8a8] dark:border-[#33415596] before:content-[''] before:absolute before:tooltip_bottom before:left-[5rem] before:h-[20px] before:w-[20px] before:bg-inherit before:border before:border-t-inherit before:border-l-inherit before:border-r-transparent before:border-b-transparent before:rotate-45">
          <form
            onSubmit={(e) => sendReply(e)}
            className="w-full h-full bg-transparent rounded-lg flex flex-col overflow-hidden"
          >
            <div className="w-full h-[4.8rem]">
              <textarea
                name="reply"
                id="reply"
                cols="30"
                rows="10"
                placeholder="Type your message here..."
                autoComplete="off"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendReply(e);
                    lastMessage();
                  }
                }}
                required
                onChange={(e) => {
                  setReply({
                    ...reply,
                    message: e.target.value,
                    message_position: threadMessage.length + 1,
                    ticket_id:
                      threadMessage.length >= 1 &&
                      threadMessage.filter(
                        (message) => message.message_position === 1
                      )[0].ticket_id,
                    subject:
                      threadMessage.length >= 1 &&
                      threadMessage.filter(
                        (msg) => msg.message_position === 1
                      )[0]["category"],
                  });
                  setSolution(e.target.value);
                }}
                value={reply.message}
                className="h-full w-full bg-transparent rounded-lg resize-none text-sm dark:text-slate-400 text-slate-700 focus:outline-none outline-none focus:border-0 focus:ring-0 transition-all border-0 dark:placeholder:text-slate-600 placeholder:text-slate-500 placeholder:text-sm"
              ></textarea>
            </div>
            {/**Reply options ======================= */}
            <div className="row-span-2 h-10 px-1.5 w-full flex justify-between items-center">
              <div className="h-full flex items-center">
                {/**Attach A file ========================================= */}
                <abbr title="Attachment">
                  <label
                    htmlFor="attachment"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 rounded-l-md flex justify-center items-center outline-none focus:outline-none hover:opacity-80 text-slate-500 text-base"
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
                {/**Upload Recordings ========================================= */}
                <abbr title="Upload Your Recording">
                  <label
                    htmlFor="recording"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 flex justify-center items-center text-base outline-none focus:outline-none hover:opacity-80 text-slate-500"
                  >
                    <BiMicrophone className="text-lg" />
                    <input
                      type="file"
                      id="recording"
                      accept=".wav"
                      name="recording"
                      title="Upload Recording"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      className="outline-none focus:outline-none hidden"
                    />
                  </label>
                </abbr>
                {/**Bold Words ========================================= */}
                <abbr title="Bold ">
                  <button
                    type="button"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 flex justify-center items-center text-base font-medium outline-none focus:outline-none hover:opacity-80 text-slate-500"
                  >
                    <span>B</span>
                  </button>
                </abbr>
                {/**Italic Words ========================================= */}
                <abbr title="Italic">
                  <button
                    type="button"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 flex justify-center items-center text-base italic font-sans outline-none focus:outline-none hover:opacity-80 text-slate-500"
                  >
                    <BsTypeItalic />
                  </button>
                </abbr>
                {/**Underline Words ========================================= */}
                <abbr title="Underline">
                  <button
                    type="button"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 flex justify-center items-center text-base font-sans outline-none focus:outline-none hover:opacity-80 text-slate-500"
                  >
                    <BsTypeUnderline />
                  </button>
                </abbr>
                {/**Turn Into Code ========================================= */}
                <abbr title="Code">
                  <button
                    type="button"
                    className="w-8 h-8 border border-r-0 border-slate-300 dark:border-slate-800 flex justify-center items-center text-base font-sans outline-none focus:outline-none hover:opacity-80 text-slate-500"
                  >
                    <BsCodeSlash />
                  </button>
                </abbr>
                {/**Change Status ========================================= */}
                <abbr title="Change Status">
                  <select
                    htmlFor="recording"
                    onChange={(e) =>
                      setReply({ ...reply, status: e.target.value })
                    }
                    required
                    className="w-28 h-8 pt-2 rounded-r-md border border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-[#182235] flex justify-center items-center outline-none focus:outline-none focus:ring-0 focus:border-slate-300 dark:focus:border-slate-800 hover:opacity-80 text-slate-500 text-xs capitalize "
                  >
                    <option className="p-2" value={reply.status}>
                      {firstMessage.length >= 1 && reply.status !== ""
                        ? firstMessage[0].status
                        : "Status"}
                    </option>
                    <option className="p-2" value="open">
                      open
                    </option>
                    <option className="p-2" value="on hold">
                      on hold
                    </option>
                    <option className="p-2" value="solved">
                      solved
                    </option>
                    <option className="p-2" value="reopened">
                      reopened
                    </option>
                  </select>
                </abbr>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => lastMessage()}
                  type="submit"
                  className="h-8 outline-none focus:outline-none focus:ring-1 focus:ring-blue-700  rounded-md text-lg p-2 px-4 font-semibold  text-slate-300 bg-slate-900 dark:bg-blue-700 z-[99] flex items-center space-x-1 hover:opacity-80 transition-all"
                >
                  <span className="text-xs">Send</span>
                  <BiPaperPlane />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
