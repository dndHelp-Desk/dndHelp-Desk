import React, { useState } from "react";
import { BsPaperclip, BsFillTrashFill, BsEnvelope } from "react-icons/bs";
import { useSelector } from "react-redux";
import { deleteTicket } from "../Data_Fetching/TicketsnUserData";
import { addClientReply } from "./DataFetching";

const Chat = () => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  let threadMessage = useSelector((state) => state.Tickets.threadMessage);
  const textFieldReadOnly = threadMessage.length >= 1 ? false : true;
  const preloaderData = [1, 2, 3, 4, 5, 6];

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
          className="w-full snap_childTwo text-slate-400 text-sm leading-6 p-2 rounded-lg flex space-x-2"
        >
          <div
            className={`h-[2.5rem] w-[5%] max-w-[2.5rem] min-w-[2.5rem] flex justify-center items-center rounded-xl uppercase text-2xl text-gray-300 ${
              message.from === "agent" ? "bg-blue-500" : "bg-slate-500"
            }`}
          >
            {`${
              message.from === "agent" && agentName && clientName
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          <div className="w-[95%] 2xl:w-full bg-slate-800 p-4 rounded-lg">
            <div className="font-bold  text-slate-300 justify-between w-full flex">
              <span>{`${
                message.from === "agent" ? agentName : clientName
              }`}</span>{" "}
              <h4 className="flex space-x-4">
                <span className="text-xs text-slate-400 font-medium">
                  {`${new Date(message.date).toDateString()}`}
                </span>
                <hr className="w-[1px] h-4 inline-block bg-slate-400 border-0 rounded-xl" />
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
                <hr className="w-[1px] h-4 inline-block bg-slate-400 border-0 rounded-xl" />
                <BsFillTrashFill
                  onClick={() => deleteTicket(message.id)}
                  className="inline hover:text-red-500 cursor-pointer"
                />
              </h4>
            </div>
            <h5 className="text-[11px] border-b lfex space-x-2 items-center border-slate-900 text-slate-500">
              <BsEnvelope className="inline" />
              {""}
              <i>
                From :{" "}
                {message.from === "agent"
                  ? "support@helpdesk.co.za"
                  : clientEmail}
              </i>
            </h5>
            <p className="mt-2">{message.message}</p>
          </div>
        </div>
      );
    });

  //Preloaders =======================================
  const preloader = preloaderData.map((data) => {
    return (
      <div
        key={data}
        className="flex space-x-3 animate-pulse w-full overflow-hidden"
      >
        <div className="h-14 w-14 rounded-full bg-slate-500"></div>
        <div className="w-[80%] space-y-2 flex flex-col justify-center">
          <div className="h-3 w-full rounded-full bg-slate-500"></div>
          <div className="h-3 w-full flex justify-between">
            <div className="h-3 w-[60%] rounded-full bg-slate-500"></div>
            <div className="h-3 w-[35%] rounded-full bg-slate-500"></div>
          </div>
          <div className="h-3 w-[40%] rounded-full bg-slate-500"></div>
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
    <div className=" bg-slate-600 custom-shadow h-[35rem] w-full rounded-lg mt-6 p-4 flex flex-col">
      {threadMessage.length <= 0 && (
        <div className="w-full h-full space-y-4 flex flex-col justify-center">
          {preloader}
        </div>
      )}
      {/**Messages Thread =========================== */}
      {threadMessage.length >= 1 && (
        <div className="w-full h-full overflow-y-scroll scroll-snap relative">
          <div className="px-6 pt-4 space-y-3 z-0 h-full">{thread}</div>
        </div>
      )}
      {/**New message // Reply =========================== */}
      <form
        onSubmit={(e) => sendReply(e)}
        className="w-full backdrop-blur-md flex items-center space-x-2 bg-[#03002942] rounded-lg z-[9999] sticky bottom-0 p-2"
      >
        <div className="w-full h-[2.5rem] bg-slate-800 rounded-lg flex space-x-1 justify-between">
          <textarea
            type="text"
            name="reply"
            id="reply"
            placeholder="Reply Here ✉️ ..."
            autoComplete="off"
            onChange={(e) =>{
              setReply({
                ...reply,
                message: e.target.value,
                ticket_id: threadId,
                message_position:threadMessage.length + 1
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
            className="bg-transparent w-full text-sm placeholder:text-sm rounded-lg bg-slate-800 border-0 text-slate-400 focus:border-0 focus:ring-0 resize-none outline-none focus:outline-none"
          ></textarea>
          {/**Other Btns =========================== */}
          <label htmlFor="attachment">
            <div className="h-[2.5rem] flex outline-none focus:outline-none items-center justify-center border-l border-slate-700 px-2 text-slate-400 font-bold text-base">
              <BsPaperclip />
            </div>
            <input
              type="file"
              name="attachment"
              id="attachment"
              className="hidden"
            />
          </label>
        </div>
        <button
          type="submit"
          className="h-[2.3rem] outline-none focus:outline-none focus:border-0 bg-blue-700 hover:opacity-80 transition-opacity duration-300 rounded-lg flex items-center justify-center text-slate-300 font-bold text-sm px-4"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
