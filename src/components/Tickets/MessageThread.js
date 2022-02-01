import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPaperclip, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import { setThreadMessage } from "../../store/TicketsSlice";
import { addReply } from "../Data_Fetching/TicketsnUserData";
import { Link } from "react-router-dom";

const MessageThread = () => {
  const threadId = useSelector((state) => state.Tickets.threadId);
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  let threadMessage = useSelector((state) => state.Tickets.threadMessage);
  const dispatch = useDispatch();

  //Filter Thread Messages =====================================
  useEffect(() => {
    allTickets.length >= 1 &&
      dispatch(
        setThreadMessage(
          allTickets
            .filter((ticket) => ticket.ticket_id === threadId)
            .sort((a, b) => {
              return a.message_position > b.message_position;
            })
        )
      );
  }, [dispatch, allTickets, threadId]);

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
          className="w-full text-slate-400 text-sm leading-6 p-2 rounded-lg flex space-x-2"
        >
          <div
            className={`h-[2.5rem] w-[5%] max-w-[2.5rem] min-w-[2.5rem] flex justify-center items-center rounded-xl uppercase text-2xl text-gray-300 ${
              message.from === "agent" ? "bg-blue-500" : "bg-slate-500"
            }`}
          >
            {`${
              message.from === "agent"
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          <div className="w-[95%] 2xl:w-full bg-slate-800 p-2 rounded-lg">
            <h4 className="font-bold  text-slate-300 justify-between w-full flex">
              <span>{`${
                message.from === "agent" ? agentName : clientName
              }`}</span>{" "}
              <span className="text-xs text-slate-400 font-medium">
                {`${new Date(message.date).toDateString()}`}
              </span>
            </h4>
            <h5 className="text-[11px] border-b lfex space-x-2 items-center border-slate-700 text-slate-500">
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

  //Send Reply Function ============================
  const sendReply = (e) => {
    e.preventDefault();
    addReply(reply.message, reply.message_position, reply.ticket_id);
    setReply({...reply,message:""})
  };

  //Component ============================
  return (
    <div className="bg-slate-900 border border-slate-400 mt-[-2rem] absolute left-[9.5%] 2xl:left-[15%] z-0 rounded-xl w-[80%] 2xl:w-[70%] p-2 overflow-hidden h-[75vh] max-h-[40rem] min-h-[20rem] flex flex-col">
      <div className="p-2 h-[3rem] border-b border-slate-800 w-full">
        <Link
          to="/help-desk/tickets"
          className="text-slate-400 px-4 py-1 h-full w-full text-xl hover:opacity-80 rounded-md space-y-1 flext items-center space-x-1"
        >
          <BsArrowLeft className="inline" />
          <span className="text-sm">Back</span>
        </Link>
      </div>
      {/**Messages Thread =========================== */}
      <div className="w-full h-full overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar relative">
        <div className="px-6 pt-4 space-y-3 z-0 h-full">{thread}</div>
        {/**New message =========================== */}
        <form
          onSubmit={(e) => sendReply(e)}
          className="w-full backdrop-blur-md flex items-center space-x-2 bg-[#03002942] z-[9999] sticky bottom-0 p-2"
        >
          <div className="w-full h-[2.5rem] bg-slate-800 rounded-lg flex space-x-1 justify-between">
            <textarea
              type="text"
              name="reply"
              id="reply"
              placeholder="Reply Here ✉️ ..."
              autoComplete="off"
              onKeyUp={(e)=>{
                if(e.key === "Enter"){
                  e.preventDefault()
                  sendReply(e);
                }
              }}
              onChange={(e) => setReply({ ...reply, message: e.target.value })}
              className="bg-transparent w-full text-sm placeholder:text-sm rounded-lg bg-slate-800 border-0 text-slate-400 focus:border-0 focus:ring-0 resize-none outline-none focus:outline-none"
              value={reply.message}
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
    </div>
  );
};

export default MessageThread;
