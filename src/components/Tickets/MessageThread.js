import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillEmojiSmileFill,
  BsTypeBold,
  BsPaperclip,
  BsCaretLeftFill,
} from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { setThreadMessage } from "../../store/TicketsSlice";
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

  //Get Name of Reciepent and Agent ===============
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
          className="w-full bg-slate-800 text-slate-400 text-sm leading-6 p-4 rounded-lg flex space-x-4 items-center"
        >
          <div className="h-[3.5rem] w-[3.5rem] flex justify-center items-center bg-slate-500 rounded-full uppercase text-2xl text-gray-300">
            {`${
              message.from === "agent"
                ? agentName.charAt(0)
                : clientName.charAt(0)
            }`}
          </div>
          <div className="w-[80%]">
            <h4 className="font-bold border-b border-slate-500 text-slate-300">
              {`${message.from === "agent" ? agentName : clientName}`}{" "}
              <span className="text-xs text-slate-400 font-medium">
                → {`${new Date(message.date).toDateString()}`}
              </span>
            </h4>
            <p className="mt-2">{message.message}</p>
          </div>
        </div>
      );
    });

  //Component ============================
  return (
    <div className="bg-slate-900 border border-slate-400 mt-[-2rem] absolute left-[9.5%] 2xl:left-[15%] z-0 rounded-xl w-[80%] 2xl:w-[70%] p-2 overflow-hidden h-screen flex flex-col">
      <div className="p-2 h-[2.5rem] w-full">
        <Link
          to="/help-desk/tickets"
          className="bg-slate-800 text-slate-400 px-4 py-1 h-full w-full text-sm hover:opacity-80 rounded-md space-y-1"
        >
          <BsCaretLeftFill className="inline" />
        </Link>
      </div>
      {/**Messages Thread =========================== */}
      <div className="w-full h-full overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar relative">
        <div className="px-6 space-y-4 z-0 h-full">{thread}</div>
        {/**New message =========================== */}
        <div className="w-full backdrop-blur-md bg-[#03002942] z-[9999] sticky bottom-0 p-2">
          <div className="w-full h-[4rem] bg-slate-800 rounded-lg flex space-x-1 justify-between">
            <textarea
              type="text"
              name="reply"
              id="reply"
              className="bg-transparent w-full rounded-lg bg-slate-800 border-0 text-slate-400 focus:border-0 focus:ring-slate-600 resize-none"
            ></textarea>
            {/**Other Btns =========================== */}
            <div className="h-[4rem] w-[5rem] border-l border-slate-700 grid grid-cols-2 gap-1 p-1">
              <button className="col-span-1 bg-slate-800 text-gray-400 hover:text-yellow-500  rounded-lg text-lg cursor-pointer flex items-center justify-center">
                <BsFillEmojiSmileFill className="hover:rotate-[-25deg] transition-rotate duration-300" />
              </button>
              <button className="col-span-1 bg-slate-800 text-gray-400 hover:text-blue-500  rounded-lg text-lg cursor-pointer flex items-center justify-center">
                <BsPaperclip />
              </button>
              <button className="col-span-1 bg-slate-800 text-gray-400  hover:opacity-80 transition-opacity duration-300  rounded-lg text-base cursor-pointer flex items-center justify-center">
                <FaPaperPlane />
              </button>
              <button className="col-span-1 bg-slate-700 text-gray-400 hover:opacity-80 transition-opacity duration-300 rounded-lg text-lg cursor-pointer flex items-center justify-center">
                <BsTypeBold />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
