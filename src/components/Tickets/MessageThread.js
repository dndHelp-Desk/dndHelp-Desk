import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillTrashFill,
  BsThreeDotsVertical,
  BsArrowLeft,
  BsReplyAllFill,
  BsFillGridFill,
} from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import noChatImg from "./images/email-open.svg";
import { setThreadMessage } from "../../store/TicketsSlice";
import { addReply, deleteTicket } from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

const MessageThread = ({ isChatOpen, setChat }) => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const threadMessage = useSelector((state) => state.Tickets.threadMessage);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const user = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();

  //Reply State and value ==================================
  const [reply, setReply] = useState({
    message: "",
    subject: "",
    message_position: threadMessage.length + 1,
    ticket_id: threadId,
  });

  //Message options ========================================
  const [msgOptions, setOptions] = useState({
    status: false,
    id: "",
    threadId: "",
  });
  const msgOptionsRef = useOnClickOutside(() =>
    setOptions({ ...msgOptions, status: false, id: "", threadId: "" })
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
  let agentName =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0].agent_name;
  let clientName =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0]
      .recipient_name;
  let clientEmail =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0]
      .recipient_email;
  let brand =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0]
      .branch_company;
  let ticket_status =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0].status;
  let date =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0].due_date;

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessage.length >= 1 &&
    threadMessage.map((message, index) => {
      return (
        <div
          key={index}
          className="w-fullw-full snap_childTwo text-slate-400 text-sm leading-6 py-4 p-2 flex gap-2 transition-all"
        >
          <div
            className={`h-[2rem] w-[5%] max-w-[2rem] min-w-[2rem] flex justify-center items-center rounded-lg uppercase font-bold text-lg dark:text-gray-400 text-slate-500 dark:bg-slate-900 bg-white border dark:border-slate-700 border-slate-400`}
          >
            {`${
              message.from === "agent" && clientName && agentName
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          <div
            className={`w-[95%] 2xl:w-full rounded-md dark:bg-slate-900 bg-white space-y-2 p-4 ${
              message.from === "agent" ? "order-first" : "order-last"
            }`}
          >
            <div className="w-full bg-transparent space-y-2 rounded-lg">
              <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                <span
                  className={`${
                    message.from !== "agent" ? "" : "order-last"
                  } hidden md:flex`}
                >{`${
                  message.from === "agent" ? agentName : clientName
                }`}</span>{" "}
                <div className="flex space-x-0 md:space-x-2 h-full items-center justify-between">
                  <button
                    onClick={() =>
                      setOptions({
                        ...msgOptions,
                        status: true,
                        id: message.message_position,
                        threadId: message.ticket_id,
                      })
                    }
                    className={`h-8 w-8 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-400 dark:text-slate-500 flex items-center justify-center ${
                      message.from === "agent" ? "" : "hidden"
                    }`}
                  >
                    <BsThreeDotsVertical className="inline  cursor-pointer" />
                  </button>
                  <span className="flex space-x-2">
                    <span className="text-xs dark:text-slate-500 text-slate-500  font-medium">
                      {`${new Date(message.date).toDateString()}`}
                    </span>
                    <span className="text-xs dark:text-slate-500 text-slate-500 font-medium">
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

                  {/**Message Options =========================== */}
                  <div
                    ref={msgOptionsRef}
                    className={`w-[10rem] ${
                      msgOptions.status === true &&
                      msgOptions.id === message.message_position &&
                      msgOptions.threadId === message.ticket_id
                        ? ""
                        : "hidden"
                    } z-[99] shadow-lg border border-slate-700 dark:bg-[#0f172a83] bg-slate-200 backdrop-blur-sm rounded-lg absolute ${
                      message.from !== "agent" ? "right-0" : "left-0"
                    }  top-10 p-4`}
                  >
                    <h5 className="text-slate-400 font-medium text-sm flex justify-between items-center">
                      <span>Delete</span>
                      <BsFillTrashFill
                        onClick={() => deleteTicket(message.id)}
                        className="hover:text-red-500 cursor-pointer"
                      />
                    </h5>
                  </div>
                </div>
              </div>
              <p className="mt-2 dark:text-slate-400 text-slate-500">
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
    if (user[0].name !== "User Loader") {
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
    <b> Hi ${clientName},</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    <b> A ticket with ID: ${threadId} has been updated. In order to reply or update this issues please navigate to the link provided at the bottom, don't foget to grab your ticket-id.</b>
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

  //Component ======================================
  return (
    <div
      className={`h-[35rem] lg:h-[40rem] ${
        isChatOpen ? "flex" : "hidden"
      } lg:flex flex-col overflow-hidden w-full lg:w-[60%] lg:rounded-r-xl rounded-xl lg:rounded-none border-l-0 lg:border-l dark:border-slate-800 border-slate-200  overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap dark:bg-slate-900 bg-white`}
    >
      <div className="h-full w-full dark:bg-[#1e293b9c] bg-slate-200 px-2 pb-2 space-y-4 overflow-hidden flex flex-col">
        <div className="h-14 bg-transparent sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-slate-800 border-slate-300">
          {/**Back To Main List  On Small Screens====================== */}
          <div
            onClick={() => setChat(false)}
            className="dark:text-slate-400 text-slate-600 font-bold py-1 h-full w-full text-xl hover:opacity-80 rounded-md flex lg:hidden items-center space-x-1 cursor-pointer"
          >
            <BsArrowLeft className="inline" />
            <span className="text-sm">Back</span>
          </div>
          <div className="flex justify-between items-center w-full space-x-2 bg-transparent relative px-3">
            {/**Opened Ticket Details ================================== */}
            <button className="outline-none focus:outline-none hover:opacity-80 text-lg">
              <BsFillGridFill className="dark:text-slate-400 text-slate-500" />
            </button>
            <div className="absolute rounded-md top-11 left-[-0.5rem] h-[28rem] w-[20rem] shadow-xl dark:bg-slate-700 bg-white border dark:border-slate-800 border-slate-300 p-4  after:content-[''] after:absolute after:top-[-0.5rem] after:left-2 after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-700 after:border-b-white after:border-l-transparent">
              <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold underline">
                Ticket Details
              </h2>
              <ul className="dark:text-slate-400 text-slate-500 mt-2 space-y-2 capitalize">
                <li className="text-xs">
                  <b>FCR ⇒ </b>
                  {filteredTickets.length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    ).length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    )[0].fcr}{" "}
                </li>
                <li className="text-xs">
                  <b>Complainant Name ⇒ </b>
                  {filteredTickets.length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    ).length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    )[0].complainant_name}{" "}
                </li>
                <li className="text-xs">
                  <b>Complainant Number ⇒ </b>
                  {filteredTickets.length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    ).length >= 1 &&
                    filteredTickets.filter(
                      (ticket) => ticket.ticket_id === threadId
                    )[0].complainant_number}{" "}
                </li>
                <li className="text-xs">
                  <b>Complainant Email ⇒ </b>
                  <spn className="lowercase">
                    {filteredTickets.length >= 1 &&
                      filteredTickets.filter(
                        (ticket) => ticket.ticket_id === threadId
                      ).length >= 1 &&
                      filteredTickets.filter(
                        (ticket) => ticket.ticket_id === threadId
                      )[0].complainant_email}{" "}
                  </spn>
                </li>
              </ul>
              <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold mt-2 underline">
                Case Details
              </h2>
              <p className="dark:text-slate-400 text-slate-500 text-xs mt-1 p-2 h-[6rem] overflow-hidden overflow-y-scroll">
                {filteredTickets.length >= 1 &&
                  filteredTickets.filter(
                    (ticket) => ticket.ticket_id === threadId
                  ).length >= 1 &&
                  filteredTickets.filter(
                    (ticket) => ticket.ticket_id === threadId
                  )[0].message}{" "}
              </p>
              <h2 className="dark:text-slate-300 text-slate-500 text-sm font-semibold mt-2 underline">
                Solution
              </h2>
              <p className="dark:text-slate-400 text-slate-500 text-xs mt-1 p-2 h-[4rem] overflow-hidden overflow-y-scroll rounded-md border dark:border-slate-800 border-slate-300">
                {filteredTickets.length >= 1 &&
                  filteredTickets.filter(
                    (ticket) => ticket.ticket_id === threadId
                  ).length >= 1 &&
                  filteredTickets.filter(
                    (ticket) => ticket.ticket_id === threadId
                  )[0].solution}{" "}
              </p>
              <form
                action=""
                className="dark:bg-slate-800 bg-slate-200 w-full h-[4.5rem] overflow-hidden rounded-md mt-2 relative"
              >
                <textarea
                  name="reply"
                  id="reply"
                  cols="30"
                  rows="10"
                  placeholder="Add solution ..."
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
                  className="h-full w-full bg-transparent rounded-lg resize-none text-sm dark:text-slate-400 text-slate-500 focus:outline-none outline-none focus:border-0 dark:focus:ring-slate-700 focus:ring-slate-300 transition-all border dark:border-slate-800 border-slate-300 placeholder:text-slate-500 placeholder:text-sm"
                ></textarea>
                <button
                  type="submit"
                  className="absolute outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 bottom-2 rounded-md text-lg right-2 p-2 px-4 font-semibold  text-slate-300 bg-blue-700 z-[99]"
                >
                  <BsReplyAllFill />
                </button>
              </form>
            </div>

            {/**Other Details =========================== */}
            <h2 className="font-semibold text-sm dark:text-slate-400 text-slate-500 tracking-wide flex flex-col capitalize text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>
                {threadMessage.length >= 1 &&
                  threadMessage.filter(
                    (message) => message.message_position === 1
                  )[0].category}
                {!threadId && "Nothing is selected"}
              </span>{" "}
              {threadId && (
                <small className="text-xs text-slate-500">
                  {threadMessage.length >= 1 &&
                    new Date(
                      threadMessage.filter(
                        (message) => message.message_position === 1
                      )[0].date
                    ).toDateString()}
                  , at{" "}
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
        <div className="h-[20rem] w-full p-2 overflow-y-scroll scroll-snap">
          {/**Messages ============================ */}
          {thread}
          {!threadId && (
            <img
              src={noChatImg}
              alt="No Ticket"
              className="w-full h-[10rem] object-contain object-center"
            />
          )}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <div className="h-[8rem] w-full bg-transparent p-4 pt-6 flex items-center justify-center relative">
        <div className="h-full w-full p-2 rounded-lg dark:bg-[#1e293b9c] bg-slate-200 after:content-[''] after:absolute after:top-[1rem] after:left-[5rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-[#1e293b9c] after:border-b-slate-200 after:border-l-transparent overflow-hidden">
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
              className="h-full w-full bg-transparent rounded-lg resize-none text-sm dark:text-slate-400 text-slate-500 focus:outline-none outline-none focus:border-0 dark:focus:ring-slate-700 focus:ring-slate-300 transition-all border dark:border-slate-800 border-slate-300 placeholder:text-slate-500 placeholder:text-sm"
            ></textarea>
            <button
              type="submit"
              className="absolute outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 bottom-2 rounded-md text-lg right-2 p-2 px-4 font-semibold  text-slate-300 bg-blue-700 z-[99]"
            >
              <BsReplyAllFill />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
