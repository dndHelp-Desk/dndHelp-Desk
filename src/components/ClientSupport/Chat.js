import React, { useState, useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import { addClientReply } from "./DataFetching";

const Chat = () => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  const preloaderData = [1, 2, 3, 4];
  console.log(window.location.search)

  //Filter Thread Messages =====================================
  const threadMessage = useMemo(() => {
    return allTickets
      .filter((ticket) => ticket.ticket_id === threadId)
      .sort((a, b) => {
        return Number(a.message_position) - Number(b.message_position);
      });
  }, [allTickets, threadId]);
  const textFieldReadOnly = threadMessage.length >= 1 ? false : true;

  //Reply State and value ==================================
  const [reply, setReply] = useState({
    message: "",
    message_position: threadMessage.length + 1,
    ticket_id: threadId,
  });

  //Get Name of Reciepent and Agent and email ===============
  let agentName =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0].agent_name;
  let clientName =
    threadMessage.length >= 1 &&
    threadMessage.filter((data) => data.message_position === 1)[0]
      .recipient_name;

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessage.length >= 1 &&
    threadMessage.map((message, index) => {
      return (
        <div
          key={index}
          className="w-full snap_child text-slate-400 text-sm leading-6 p-2 rounded-lg flex overflow-hidden gap-2"
        >
          <div
            className={`h-[2rem] w-[2rem] min-w-[2rem] hidden sm:flex justify-center items-center rounded-lg uppercase text-lg text-gray-300 bg-slate-800 ${
              message.from === "agent" ? "order-first" : "order-last"
            }`}
          >
            {`${
              message.from === "agent" && agentName ? agentName.charAt(0) : "Y"
            }`}
          </div>
          <div className={`w-[95%] 2xl:w-full  bg-slate-800 p-4 rounded-lg`}>
            <div className="font-bold  text-slate-300 justify-between w-full flex-col md:flex-row flex border-b border-slate-700">
              <span
                className={`${message.from === "agent" ? "" : "order-last"}`}
              >{`${message.from === "agent" ? agentName : "You"}`}</span>{" "}
              <h4 className="flex space-x-4">
                <span className="text-xs text-slate-400 font-medium">
                  {`${new Date(message.date).toDateString()}`}
                </span>
                <span className="text-xs text-slate-400 font-medium">
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
              </h4>
            </div>
            <p
              className={`${message.from === "agent" ? "" : "text-right"} mt-2`}
            >
              {message.message}
            </p>
            <div
              className={`mt-2 flex ${
                message.from === "agent" ? "justify-end" : ""
              } space-x-2 px-2 capitalize text-xs text-blue-600 italic ${
                message.from === "agent" ? "hidden" : ""
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
      );
    });

  //Preloaders =======================================
  const preloader = preloaderData.map((data) => {
    return (
      <div
        key={data}
        className="flex justify-center space-x-3 animate-pulse w-full overflow-hidden"
      >
        <div className="h-14 w-14 rounded-full bg-slate-800"></div>
        <div className="w-[80%] space-y-2 flex flex-col justify-center">
          <div className="h-3 w-full rounded-full bg-slate-800"></div>
          <div className="h-3 w-full flex justify-between">
            <div className="h-3 w-[60%] rounded-full bg-slate-800"></div>
            <div className="h-3 w-[35%] rounded-full bg-slate-800"></div>
          </div>
          <div className="h-3 w-[40%] rounded-full bg-slate-800"></div>
        </div>
      </div>
    );
  });

  //Send Reply Function ============================
  const sendReply = (e) => {
    e.preventDefault();
    threadMessage.length >= 1 &&
      addClientReply(reply.message, reply.message_position, reply.ticket_id);
    setReply({ ...reply, message: "" });
  };

  //Component ===============================
  return (
    <div className=" bg-slate-600 custom-shadow h-[35rem]  max-w-[45rem] w-full rounded-lg mt-4 p-2 flex flex-col">
      {threadMessage.length <= 0 && (
        <div className="w-full h-[60%] space-y-4 flex flex-col items-center justify-center">
          {preloader}
        </div>
      )}
      {/**Messages Thread =========================== */}
      {threadMessage.length >= 1 && (
        <div className="w-full h-[60%] overflow-x-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap relative">
          <div className="md:px-4 pt-4 space-y-3 z-0 h-full">{thread}</div>
        </div>
      )}
      {/**Reply ====================================== */}
      <div className="h-[45%] lg:h-[40%] w-full bg-transparent p-4 pt-6 flex items-center justify-center relative">
        <div className="h-full w-full p-2 rounded-lg  bg-slate-800 after:content-[''] after:absolute after:top-[1rem] after:left-[5rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-800 after:border-b-slate-800 after:border-l-transparent overflow-hidden grid grid-rows-4 gap-2">
          <div className="w-full row-span-1 h-full flex justify-between">
            <div className="flex space-x-2 items-center">
              <div className="w-9 h-9 dark:bg-slate-900 bg-slate-500 rounded-lg border border-slate-500 flex justify-center items-center font-bold uppercase dark:text-slate-500 text-slate-300 text-lg">
                {clientName ? clientName.charAt(0) : "Y"}
              </div>
              <h2 className="font-semibold text-xs justify-center text-slate-400 tracking-wide flex flex-col">
                <span>Reply As</span>{" "}
                <small className="text-xs text-slate-500">{clientName}</small>{" "}
              </h2>
            </div>
            <button className="h-9 w-9 rounded-lg dark:hover:bg-slate-900 hover:bg-slate-300 flex items-center justify-center text-slate-500 transition-all outline-none focus:outline-none text-base font-bold">
              <BsThreeDotsVertical />
            </button>
          </div>
          <form
            onSubmit={(e) => sendReply(e)}
            className="row-span-3 h-full w-full bg-transparent rounded-lg relative"
          >
            <textarea
              name="reply"
              id="reply"
              cols="30"
              rows="10"
              placeholder="Type your message here..."
              autoComplete="off"
              onChange={(e) => {
                setReply({
                  ...reply,
                  message: e.target.value,
                  ticket_id: threadId,
                  message_position: threadMessage.length + 1,
                });
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendReply(e);
                }
              }}
              value={reply.message}
              required
              readOnly={textFieldReadOnly}
              className="h-full w-full  bg-slate-800 rounded-lg resize-none text-sm dark:text-slate-400 text-slate-500 border-0 focus:outline-none outline-none focus:border-0 transition-all dark:focus:ring-slate-700 focus:ring-slate-700 placeholder:text-slate-500 placeholder:text-sm"
            ></textarea>
            <button
              type="submit"
              className="absolute outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 bottom-2 rounded-md text-sm right-2 p-2 px-4 font-semibold  text-slate-300 bg-blue-700 z-[99]"
            >
              Send <span className="hidden sm:inline">Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
