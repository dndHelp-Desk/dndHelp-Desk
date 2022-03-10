import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillTrashFill, BsThreeDotsVertical } from "react-icons/bs";
import { BiPaperPlane } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import noChatImg from "./images/email-open.svg";
import { setThreadMessage } from "../../store/TicketsSlice";
import {
  addReply,
  deleteTicket,
  resolveTicket,
} from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const MessageThread = ({ isChatOpen }) => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const threadMessage = useSelector((state) => state.Tickets.threadMessage);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const user = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();

  //Solution =========================
  const [solution, setSolution] = useState("");

  //Thread First Message =====================
  const firstMessage =
    filteredTickets.length >= 1 &&
    filteredTickets.filter((ticket) => ticket.ticket_id === threadId).length >=
      1 &&
    filteredTickets.filter((ticket) => ticket.ticket_id === threadId);

  //Reply State and value ==================================
  const [reply, setReply] = useState({
    message: "",
    subject: "",
    message_position: threadMessage.length + 1,
    ticket_id: firstMessage.length >= 1 ? firstMessage.ticket_id : "none",
  });

  //Message options ========================================
  const [msgOptions, setOptions] = useState({
    status: false,
    id: "",
    threadId: "",
  });
  const msgOptionsRef = useOnClickOutside(() =>
    setOptions({ status: false, id: "", threadId: "" })
  );

  //Filter Thread Messages =====================================
  useEffect(() => {
    allTickets.length >= 1 &&
      dispatch(
        setThreadMessage(
          allTickets
            .filter((ticket) => ticket.ticket_id === threadId)
            .sort((a, b) => {
              return Number(a.message_position) - Number(b.message_position);
            })
        )
      );
  }, [dispatch, allTickets, threadId]);

  //Get Name of Reciepent and Agent and email ===============
  let agentName = firstMessage.length >= 1 && firstMessage[0].agent_name;
  let clientName = firstMessage.length >= 1 && firstMessage[0].recipient_name;
  let clientEmail = firstMessage.length >= 1 && firstMessage[0].recipient_email;
  let brand = firstMessage.length >= 1 && firstMessage[0].branch_company;
  let ticket_status = firstMessage.length >= 1 && firstMessage[0].status;
  let date = firstMessage.length >= 1 && firstMessage[0].due_date;

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessage.length >= 1 &&
    threadMessage.map((message, index) => {
      return (
        <div
          key={index}
          className="w-fullw-full snap_childTwo text-slate-400 text-sm leading-6 py-4 p-2 flex gap-2 transition-all"
        >
          {/**Avatar ====================== */}
          <div
            className={`h-[2rem] w-[5%] max-w-[2rem] min-w-[2rem] flex justify-center items-center rounded-lg uppercase font-bold text-lg dark:text-gray-300 text-slate-900 dark:bg-slate-700 bg-slate-100 border dark:border-slate-600 border-slate-400`}
          >
            {`${
              message.from === "agent" && clientName && agentName
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          {/**Message ====================== */}
          <div
            className={`w-[95%] 2xl:w-full rounded-md dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-300 space-y-2 px-4 pb-4 ${
              message.from === "agent" ? "order-first pt-1" : "order-last pt-2"
            }`}
          >
            <div className="w-full bg-transparent space-y-2 rounded-lg">
              <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                <span className="hidden md:flex dark:text-slate-300 text-slate-900">{`${
                  message.from === "agent" ? agentName : clientName
                }`}</span>{" "}
                <div className="flex space-x-0 md:space-x-2 h-full items-center justify-between">
                  <span className="flex space-x-2">
                    <span className="text-xs dark:text-slate-500 text-slate-700  font-medium">
                      {`${new Date(message.date).toDateString()}`}
                    </span>
                    <span className="text-xs dark:text-slate-500 text-slate-600 font-medium">
                      {`${
                        Number(message.time.split(":")[0]) < 10
                          ? "0" + Number(message.time.split(":")[0])
                          : message.time.split(":")[0]
                      }:${
                        Number(message.time.split(":")[1]) < 10
                          ? "0" + Number(message.time.split(":")[1])
                          : message.time.split(":")[1]
                      }`}
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
                    className="h-8 w-8 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-500 text-slate-700 flex items-center justify-center"
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
              <p className="mt-2 dark:text-slate-400 text-slate-700">
                {message.message}
              </p>
              <div
                className={`mt-2 flex justify-end space-x-2 px-2 capitalize text-xs text-blue-600 italic ${
                  message.from === "client" ? "hidden" : ""
                }`}
              >
                <p>{message.readStatus} </p>
                <div className="flex font-bold space-x-[1px] text-sm">
                  <HiCheck />
                  <HiCheck
                    className={`${
                      message.readStatus !== "read" ? "text-slate-500" : ""
                    }`}
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      );
    });

  //Link Google Appscript API for sendind Emails To new Tickect ================
  /*const sendMailAPI =
    "https://script.google.com/macros/s/AKfycbzkiHwJbA0lXnz40HZ7mls-oNMUJdMjMbvyNTMlx513iXSADnSkLlaYfL1TUV0WPBOS3w/exec?action=addData";*/

  //Send Reply Function ============================
  const sendReply = (e) => {
    e.preventDefault();
    if (user[0].name !== "User Loader" && reply.ticket_id !== "none") {
      addReply(reply.message, reply.message_position, reply.ticket_id);
      setReply({ ...reply, message: "" });

      //Send Email Using App Script  =============
      /*fetch(sendMailAPI, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          subject: reply.subject,
          message: reply.message,
          ticket_id: threadId,
          brand: brand,
          ticket_status: ticket_status,
          date: date,
        }),
      });*/

      //Relpy Using Nodemailer ===================
      fetch("https://dndhelp-desk-first.herokuapp.com/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: clientEmail,
          subject: reply.subject,
          ticket_id: threadId,
          email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    Hi ${clientName},
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    A ticket with ID: ${threadId} has been updated. In order to reply or update this issues please navigate to the link provided at the bottom, don't foget to grab your ticket-id.
  </p>
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
  };

  //Send Solution send Solution ====================
  const sendSolution = (e) => {
    e.preventDefault();
    resolveTicket(firstMessage.length >= 1 && firstMessage[0].id, solution);
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
        email: clientEmail,
        subject: firstMessage.length >= 1 && firstMessage[0].category,
        ticket_id: threadId,
        email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
     Hi ${clientName},
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    A ticket with ID: ${threadId} has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.
  </p>
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
  };

  //Component ======================================
  return (
    <div
      className={`h-[40rem] ${
        isChatOpen ? "flex" : "hidden"
      } lg:flex flex-col overflow-hidden w-full lg:w-[60%] lg:rounded-r-xl rounded-md lg:rounded-none border-l-0 lg:border-l dark:border-slate-800 border-slate-200  overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap dark:bg-slate-900 bg-slate-100`}
    >
      <div className="h-full w-full dark:bg-[#1e293b9c] bg-slate-200 px-2 pb-2 space-y-4 overflow-hidden flex flex-col">
        <div className="h-14 bg-transparent sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-slate-800 border-slate-300">
          {/**Opened Ticket Details ================================== */}
          <div className="flex justify-between items-center w-full space-x-2 bg-transparent px-3">
            <details className="relative flex items-center space-x-2">
              <summary className="text-sm leading-6 dark:text-slate-300 text-slate-900 font-semibold font-sans select-none cursor-pointer">
                Details
              </summary>

              <div className="absolute flex flex-col rounded-md top-10 left-[-0.8rem] h-[28rem] w-[25rem] shadow-xl dark:bg-slate-700 bg-white border dark:border-slate-800 border-slate-300 p-4  after:content-[''] after:absolute after:top-[-0.5rem] after:left-2 after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-700 after:border-b-white after:border-l-transparent">
                <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold underline">
                  Ticket Details
                </h2>
                <ul className="dark:text-slate-400 text-slate-500 mt-2 space-y-2 capitalize">
                  <li className="text-xs">
                    <b>FCR ⇒ </b>
                    {firstMessage.length >= 1 && firstMessage[0].fcr}{" "}
                  </li>
                  <li className="text-xs">
                    <b>Complainant Name ⇒ </b>
                    {firstMessage.length >= 1 &&
                      firstMessage[0].complainant_name}{" "}
                  </li>
                  <li className="text-xs">
                    <b>Complainant Number ⇒ </b>
                    {firstMessage.length >= 1 &&
                      firstMessage[0].complainant_number}{" "}
                  </li>
                  <li className="text-xs">
                    <b>Complainant Email ⇒ </b>
                    <span className="lowercase">
                      {firstMessage.length >= 1 &&
                        firstMessage[0].complainant_email}{" "}
                    </span>
                  </li>
                </ul>
                <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold mt-2 underline">
                  Case Details
                </h2>
                <p className="dark:text-slate-400 text-slate-500 text-xs mt-1 p-1 h-[6rem] overflow-hidden overflow-y-scroll">
                  {firstMessage.length >= 1 && firstMessage[0].message}{" "}
                </p>
                <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold mt-2 underline">
                  Solution :{" "}
                  {firstMessage.length >= 1 &&
                  firstMessage[0].closed_time !== ""
                    ? new Date(firstMessage[0].closed_time).toLocaleDateString()
                    : ""}
                </h2>
                <p className="dark:text-slate-400 text-slate-500 text-xs mt-1 p-1 h-[4rem] overflow-hidden overflow-y-scroll rounded-md">
                  {firstMessage.length >= 1 && firstMessage[0].solution}{" "}
                </p>

                {/**Add Solution ======================== */}
                {firstMessage.length >= 1 &&
                  firstMessage[0].status !== "solved" && (
                    <form
                      className="dark:bg-slate-800 bg-slate-200 w-full h-[4.5rem] overflow-hidden rounded-md mt-2 relative"
                      onSubmit={(e) => sendSolution(e)}
                    >
                      <textarea
                        name="reply"
                        id="reply"
                        cols="30"
                        rows="10"
                        placeholder="Add solution ..."
                        autoComplete="off"
                        required
                        onChange={(e) => {
                          setSolution(e.target.value);
                        }}
                        value={solution}
                        className="h-full w-full bg-transparent rounded-lg resize-none text-sm dark:text-slate-400 text-slate-500 focus:outline-none outline-none focus:border-0 dark:focus:ring-slate-700 focus:ring-slate-300 transition-all border dark:border-slate-800 border-slate-300 placeholder:text-slate-500 placeholder:text-sm"
                      ></textarea>
                      <div className="absolute right-2 bottom-2 sendSolution h-8 w-12">
                        <button
                          type="submit"
                          className="outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-lg p-2 px-4 font-semibold hidden text-slate-300 bg-blue-700 z-[99]"
                        >
                          <BiPaperPlane />
                        </button>
                      </div>
                    </form>
                  )}
              </div>
            </details>

            {/**Other Details =========================== */}
            <h2 className="font-semibold text-sm dark:text-slate-300 text-slate-900 tracking-wide flex flex-col capitalize text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>
                {threadMessage.length >= 1 &&
                  threadMessage.filter(
                    (message) => message.message_position === 1
                  )[0].category}
                {!threadId && "Nothing is selected"}
              </span>{" "}
              {threadId && (
                <small className="text-0.6rem dark:text-slate-400 text-slate-500">
                  {threadMessage.length >= 1 &&
                    new Date(
                      threadMessage.filter(
                        (message) => message.message_position === 1
                      )[0].date
                    ).toDateString()}
                  {"  "}
                  {`${
                    (threadMessage.length >= 1 &&
                      Number(
                        threadMessage
                          .filter(
                            (message) => message.message_position === 1
                          )[0]
                          .time.split(":")[0]
                      )) < 10
                      ? "0" +
                        (threadMessage.length >= 1 &&
                          Number(
                            threadMessage
                              .filter(
                                (message) => message.message_position === 1
                              )[0]
                              .time.split(":")[0]
                          ))
                      : threadMessage.length >= 1 &&
                        Number(
                          threadMessage
                            .filter(
                              (message) => message.message_position === 1
                            )[0]
                            .time.split(":")[0]
                        )
                  }:${
                    (threadMessage.length >= 1 &&
                      Number(
                        threadMessage
                          .filter(
                            (message) => message.message_position === 1
                          )[0]
                          .time.split(":")[1]
                      )) < 10
                      ? "0" +
                        (threadMessage.length >= 1 &&
                          Number(
                            threadMessage
                              .filter(
                                (message) => message.message_position === 1
                              )[0]
                              .time.split(":")[1]
                          ))
                      : threadMessage.length >= 1 &&
                        Number(
                          threadMessage
                            .filter(
                              (message) => message.message_position === 1
                            )[0]
                            .time.split(":")[1]
                        )
                  }`}
                </small>
              )}
            </h2>
          </div>
        </div>
        <div className="h-full w-full p-2 overflow-y-scroll scroll-snap">
          {/**Thread Messages ============================ */}
          {thread}
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
      <div className="h-[8rem] w-full bg-transparent p-4 pt-6 flex items-center justify-center relative">
        <div className="h-full w-full p-2 rounded-lg dark:bg-[#1e293b9c] bg-slate-200 border border-slate-300 dark:border-slate-800 after:content-[''] after:absolute after:top-[1rem] after:left-[5rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-[#1e293b9c] after:border-b-slate-200 after:border-l-transparent overflow-hidden">
          <form
            onSubmit={(e) => sendReply(e)}
            className="h-full w-full bg-transparent rounded-lg relative"
          >
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
              }}
              value={reply.message}
              className="h-full w-full bg-transparent rounded-lg resize-none text-sm dark:text-slate-400 text-slate-700 focus:outline-none outline-none focus:border-0 dark:focus:ring-slate-700 focus:ring-slate-300 transition-all border-0 dark:placeholder:text-slate-500 placeholder:text-slate-700 placeholder:text-sm"
            ></textarea>
            <button
              type="submit"
              className="absolute outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 bottom-2 rounded-md text-lg right-2 p-2 px-4 font-semibold  text-slate-300 bg-blue-700 z-[99]"
            >
              <BiPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
