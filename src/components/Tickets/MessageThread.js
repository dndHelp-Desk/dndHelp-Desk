import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillTrashFill,
  BsThreeDotsVertical,
  BsArrowLeft,
} from "react-icons/bs";
import { setThreadMessage } from "../../store/TicketsSlice";
import { addReply, deleteTicket } from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../store/NotificationsSlice";

const MessageThread = ({ isChatOpen, setChat }) => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  let threadMessage = useSelector((state) => state.Tickets.threadMessage);
  const user = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();

  //Reply State and value ==================================
  const [reply, setReply] = useState({
    message: "",
    message_position: threadMessage.length + 1,
    ticket_id: threadId,
  });

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

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessage.length >= 1 &&
    threadMessage.map((message, index) => {
      return (
        <div
          key={index}
          className="w-fullw-full snap_childTwo text-slate-400 text-sm leading-6 p-2 rounded-xl flex space-x-2 transition-all"
        >
          <div
            className={`h-[2rem] w-[5%] max-w-[2rem] min-w-[2rem] flex justify-center items-center rounded-lg uppercase text-lg text-gray-400 bg-blue-700`}
          >
            {`${
              message.from === "agent" && clientName && agentName
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          <div className="w-[95%] 2xl:w-full p-2 bg-transparent bg-[#192235] rounded-lg space-y-2">
            <div className="w-[95%] 2xl:w-full bg-transparent space-y-2 rounded-lg">
              <div className="font-bold  text-slate-400 justify-between w-full flex flex-col py-2 md:flex-row border-b border-slate-900">
                <span>{`${
                  message.from === "agent" ? agentName : clientName
                }`}</span>{" "}
                <h4 className="flex space-x-4">
                  <span className="text-xs text-slate-400 font-medium">
                    {`${new Date(message.date).toDateString()}`}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
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
                  <hr className="w-[1px] h-4 inline-block bg-slate-600 border-0 rounded-xl" />
                  <BsFillTrashFill
                    onClick={() => deleteTicket(message.id)}
                    className="inline hover:text-red-500 cursor-pointer"
                  />
                </h4>
              </div>
              <p className="mt-2 text-slate-500">{message.message}</p>
            </div>
          </div>
        </div>
      );
    });

  //Link Google Appscript API for sendind Emails To new Tickect ================
  const sendMailAPI =
    "https://script.google.com/macros/s/AKfycbzkiHwJbA0lXnz40HZ7mls-oNMUJdMjMbvyNTMlx513iXSADnSkLlaYfL1TUV0WPBOS3w/exec?action=addData";

  //Send Reply Function ============================
  const sendReply = (e) => {
    e.preventDefault();
    addReply(reply.message, reply.message_position, reply.ticket_id);
    setReply({ ...reply, message: "" });
    //Send Email =============
    fetch(sendMailAPI, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        message:
          "You have a new response from Dial & Dine regarding your ticket.",
        ticket_id: threadId,
      }),
    });
    dispatch(
      updateAlert({
        message: "Response Has Been Sent.",
        color: "bg-green-200",
      })
    );
  };

  //Component ======================================
  return (
    <div
      className={`h-[35rem] lg:h-[40rem] ${
        isChatOpen ? "flex" : "hidden"
      } lg:flex flex-col overflow-hidden w-full lg:w-[60%] lg:rounded-r-xl rounded-xl lg:rounded-none border-l-0 lg:border-l border-slate-800  overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap bg-slate-900`}
    >
      <div className="h-[70%] w-full bg-slate-800 px-2 pb-2 space-y-4  overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap">
        <div className="h-14 bg-slate-800 sticky py-2 top-0 w-full flex justify-between border-b border-slate-700">
          {/**Back To Main List  On Small Screens====================== */}
          <div
            onClick={() => setChat(false)}
            className="text-slate-400 font-bold py-1 h-full w-full text-xl hover:opacity-80 rounded-md space-y-1 flex lg:hidden items-center space-x-1 cursor-pointer"
          >
            <BsArrowLeft className="inline" />
            <span className="text-sm">Back</span>
          </div>

          <h2 className="font-semibold text-sm text-slate-400 tracking-wide hidden lg:flex flex-col">
            <span>Opened On</span>{" "}
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
                      .filter((message) => message.message_position === 1)[0]
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
                        .filter((message) => message.message_position === 1)[0]
                        .time.split(":")[0]
                    )
              }:${
                (threadMessage.length >= 1 &&
                  Number(
                    threadMessage
                      .filter((message) => message.message_position === 1)[0]
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
                        .filter((message) => message.message_position === 1)[0]
                        .time.split(":")[1]
                    )
              }`}
            </small>{" "}
          </h2>
          <div className="flex space-x-2">
            <h2 className="font-semibold text-sm text-slate-400 tracking-wide flex flex-col capitalize w-32 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>
                {threadMessage.length >= 1 &&
                  threadMessage.filter(
                    (message) => message.message_position === 1
                  )[0].category}
              </span>{" "}
              <small className="text-xs text-slate-500">
                {clientName},{" "}
                {threadMessage.length >= 1 &&
                  threadMessage.filter(
                    (message) => message.message_position === 1
                  )[0].branch_company}
              </small>{" "}
            </h2>
            <div className="w-9 h-9 bg-slate-900 rounded-lg border border-slate-500 flex justify-center items-center font-bold uppercase text-slate-500 text-lg">
              {clientName && clientName.charAt(0)}
            </div>
          </div>
        </div>
        <div className="h-[20rem] w-full p-2 overflow-y-scroll scroll-snap space-y-2">
          {/**Messages ============================ */}
          {thread}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <div className="h-[45%] lg:h-[40%] w-full bg-transparent p-4 pt-6 flex items-center justify-center relative">
        <div className="h-full w-full p-2 rounded-lg bg-slate-800 after:content-[''] after:absolute after:top-[1rem] after:left-[5rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent after:border-b-slate-800 after:border-l-transparent overflow-hidden grid grid-rows-4">
          <div className="w-full row-span-1 h-full flex justify-between">
            <div className="flex space-x-2">
              <div className="w-9 h-9 bg-slate-900 rounded-lg border border-slate-500 flex justify-center items-center font-bold uppercase text-slate-500 text-lg">
                {user[0].name.charAt(0)}
              </div>
              <h2 className="font-semibold text-xs justify-center text-slate-400 tracking-wide flex flex-col">
                <span>Reply As</span>{" "}
                <small className="text-xs text-slate-500">{user[0].name}</small>{" "}
              </h2>
            </div>
            <button className="h-9 w-9 rounded-lg hover:bg-slate-900 flex items-center justify-center text-slate-400 transition-all outline-none focus:outline-none text-base font-bold">
              <BsThreeDotsVertical />
            </button>
          </div>
          <form
            onSubmit={(e) => sendReply(e)}
            className="row-span-3 h-full w-full bg-slate-800 rounded-lg relative"
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
                });
              }}
              value={reply.message}
              className="h-full w-full bg-slate-800 rounded-lg resize-none border- text-sm text-slate-400 border-0 focus:outline-none outline-none focus:border-0 transition-all focus:ring-slate-700 placeholder:text-slate-500 placeholder:text-sm"
            ></textarea>
            <button
              type="submit"
              className="absolute outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 bottom-2 rounded-md text-sm right-2 p-2 px-4 font-semibold text-slate-400 bg-blue-700 z-[99]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
