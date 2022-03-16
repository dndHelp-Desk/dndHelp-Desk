import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  changePriority,
  changeStatus,
  reOpenTicket,
  markAsSeen,
} from "./../Data_Fetching/TicketsnUserData";
import { BsBookmarkCheck, BsBookmarkX, BsBookmark } from "react-icons/bs";
import { setThreadId } from "./../../store/Tickets_n_Settings_Slice";
import MessageThread from "./MessageThread";
import { updateAlert } from "../../store/NotificationsSlice";
import Navbar from "./Navbar";
import noTickets from "./images/no-userss.svg";
import NewTicket from "./NewTicket";

const TicketsList = ({ setDelete, deleteArray, setModal, newTicketModal }) => {
  const dispatch = useDispatch();
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  //const filters = useSelector((state) => state.Tickets.filters);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
  const [isChatOpen, setChat] = useState(false);
  const threadId = useSelector((state) => state.Tickets.threadId);
  const [audio, audioUrl] = useState("");
  const unread = useSelector((state) => state.Tickets.unread);

  //Loop Through Each Tickects =================
  const tickets =
    filteredTickets.length >= 1 &&
    filteredTickets.map((ticket) => {
      /**Mark As read if thread is Active ========== */
      threadId === ticket.ticket_id &&
        unread.length >= 1 &&
        unread
          .filter((data) => data.ticket_id === ticket.ticket_id)
          .forEach((message) => {
            markAsSeen(message.id, "read");
          });
      /**End ========== */

      return (
        <div
          key={ticket.id}
          //Filter Added Using Conditional Styling =============================
          className={`w-full h-[5rem] border dark:border-slate-800 border-slate-400 relative rounded-tl-md rounded-bl-md dark:bg-[#1e293b9c] shadow-sm snap_childTwo  ${
            ticket.ticket_id === threadId
              ? "border-r-2 dark:border-r-blue-600 border-r-blue-600"
              : ""
          } bg-slate-200 p-2 space-x-2  flex `}
        >
          {/**Indicate The ticket is resolved ================*/}
          {ticket.status && ticket.status.toLowerCase() === "solved" && (
            <BsBookmarkCheck className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs text-blue-500" />
          )}

          {/**Indicate The ticket that is not solved or  overdue ================*/}
          {new Date(ticket.due_date !== null && ticket.due_date).getTime() >
            new Date().getTime() &&
            ticket.status &&
            ticket.status.toLowerCase() !== "solved" && (
              <BsBookmark className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs dark:text-slate-400 text-slate-500" />
            )}

          {/**Indicate The ticket that is  overdue ================*/}
          {new Date(ticket.due_date !== null && ticket.due_date).getTime() <=
            new Date().getTime() &&
            ticket.status &&
            ticket.status.toLowerCase() === "open" && (
              <BsBookmarkX className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs text-red-500" />
            )}

          {/**Indicate if it's new messsage ================*/}
          {unread.filter((data) => data.ticket_id === ticket.ticket_id)
            .length >= 1 && (
            <div className="absolute left-7 top-[0.15rem] flex justify-center items-center tracking-wide rounded-sm w-12 bg-blue-600 text-[0.6rem] text-slate-200">
              <span>
                New :{" "}
                {
                  unread.filter((data) => data.ticket_id === ticket.ticket_id)
                    .length
                }
              </span>
            </div>
          )}

          {/**Mark or Unmark Ticket ========================================== */}
          <div className="col-span-1 h-full xl:w-[7rem] flex justify-between space-x-2 items-center">
            <input
              type="checkbox"
              className="rounded  text-blue-600 h-3 w-3 checked:bg-blue-600 shadow-sm dark:border-slate-700 border-slate-500 dark:bg-slate-400 dark:checked:bg-blue-600 bg-slate-100 focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
              name="mark"
              id="mark"
              checked={
                deleteArray.includes(ticket.ticket_id) === true ? true : false
              }
              onChange={(e) =>
                e.target.checked === true
                  ? setDelete([...deleteArray, ticket.ticket_id])
                  : setDelete(
                      deleteArray.filter((data) => data !== ticket.ticket_id)
                    )
              }
            />
            <div className="h-8 w-8 rounded-md dark:bg-slate-800 bg-slate-200 flex lg:hidden xl:flex justify-center items-center border-2 dark:border-slate-600 border-slate-500 capitalize">
              <abbr title={ticket.recipient_name}>
                <h4 className="dark:text-slate-300 text-slate-700 font-semibold text-base">{`${
                  ticket.recipient_name && ticket.recipient_name.charAt(0)
                }`}</h4>
              </abbr>
            </div>
          </div>

          {/**Ticket Details ========================================== */}
          <div
            onClick={() => {
              dispatch(setThreadId(ticket.ticket_id));
              window.localStorage.setItem("threadId", JSON.stringify(threadId));
              setChat(true);
              unread.length >= 1 &&
                unread
                  .filter((data) => data.ticket_id === ticket.ticket_id)
                  .forEach((message) => {
                    markAsSeen(message.id, "read");
                  });
              /**Get The Recording ================== */
              if (ticket.status === "solved") {
                const storage = getStorage();
                const recordingRef = ref(
                  storage,
                  `/dial_n_dine/${ticket.ticket_id}.wav`
                );
                getDownloadURL(recordingRef).then((url) => {
                  audioUrl(url);
                });
              }
            }}
            className="col-span-5 flex flex-col justify-center relative h-full w-full space-y-1 px-1 py-1 cursor-pointer overflow-hidden"
          >
            <abbr title={ticket.ticket_id}>
              <h2 className="dark:text-slate-300  text-slate-900 text-xs dark:font-semibold font-bold font-sans uppercase whitespace-nowrap w-full overflow-hidden overflow-ellipsis">
                {ticket.category} : {ticket.ticket_id}
              </h2>
            </abbr>
            <h5 className="dark:text-slate-400 max-w-[10rem] text-slate-700 text-xs tracking-wide font-base capitalize overflow-hidden whitespace-nowrap overflow-ellipsis">
              <abbr title={ticket.branch_company}>{ticket.branch_company}</abbr>
            </h5>
            <small className="dark:text-slate-400 text-slate-500 text-[0.6rem] whitespace-nowrap">
              Due on {new Date(ticket.due_date).toLocaleString()}
            </small>
          </div>
          <div className="col-span-5 float-right h-full w-[20rem] hidden md:flex flex-col items-center justify-center space-y-1">
            {/**Ticket Priority ========================================== */}
            <div className="w-[10rem] flex items-baseline justify-end">
              {/**Change Ticket Priority ========================================== */}
              <select
                onChange={(e) => changePriority(ticket.id, e.target.value)}
                className="h-8 w-28 rounded-md text-xs p-2 dark:bg-[#192235] bg-slate-200 dark:text-slate-500 text-slate-700 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none  border-0 capitalize"
              >
                <option className="capitalize p-2" value="low">
                  {ticket.priority}
                </option>
                <option className="capitalize p-2" value="low">
                  Low
                </option>
                <option className="capitalize" value="medium">
                  Medium
                </option>
                <option className="capitalize" value="high">
                  High
                </option>
                <option className="capitalize" value="urgent">
                  Urgent
                </option>
              </select>
            </div>
            {/**Change Ticket Status ========================================== */}
            <div className="w-[10rem] flex items-baseline justify-end">
              <select
                onChange={(e) =>
                  e.target.value === "solved"
                    ? dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Please Add the Resolution.",
                            color: "bg-yellow-200",
                          },
                        ])
                      )
                    : e.target.value === "reopened"
                    ? reOpenTicket(ticket.id, e.target.value, true)
                    : changeStatus(ticket.id, e.target.value)
                }
                className="h-8 w-28 rounded-md text-xs p-2 dark:bg-[#192235] bg-slate-200 dark:text-slate-500 text-slate-700 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none  border-0 capitalize"
              >
                <option className="capitalize p-2" value="resolved">
                  {ticket.status}
                </option>
                <option className="capitalize" value="open">
                  open
                </option>
                <option className="capitalize" value="on hold">
                  on hold
                </option>
                <option className="capitalize p-2" value="solved">
                  solved
                </option>
                <option className="capitalize p-2" value="reopened">
                  reopened
                </option>
              </select>
            </div>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="relative">
      {/**New Ticket Form ====================================== */}
      <NewTicket setModal={setModal} newTicketModal={newTicketModal} />
      {/**Tickets ========================================== */}
      <div
        className={`flex flex-col lg:flex-row dark:bg-slate-900 bg-slate-100 rounded-xl py-2  ${
          isChatOpen && "space-y-4"
        } lg:space-y-0 lg:space-x-2 space-x-0 ralative`}
      >
        {/**Back To Main List On Small Screens ====================== */}
        <div
          onClick={() => setChat(false)}
          className={`dark:text-slate-400 text-slate-600 font-bold py-1 h-2 w-full text-xl hover:opacity-80 rounded-md flex lg:hidden items-center space-x-1 cursor-pointer ${
            !isChatOpen && "hidden"
          } md:hidden`}
        >
          <span className="text-sm">Back</span>
        </div>

        {/**Components ================================== */}
        <div
          className={`w-full lg:w-[40%] h-[38rem] lg:h-[40rem] flex flex-col gap-2.5 pt-1 ${
            isChatOpen ? "hidden lg:flex lg:opacity-100 opacity-0" : ""
          }`}
        >
          <Navbar
            deleteArray={deleteArray}
            setDelete={setDelete}
            setModal={setModal}
          />
          <div className="w-full h-full space-y-2 overflow-hidden overflow-y-scroll scroll-snap pr-1 relative">
            {tickets}
            {filteredTickets.length >= 1 && (
              <div className="sticky h-[1.5rem] md:h-[3.2rem] w-full dark:bg-slate-900 bg-slate-100 bottom-0 flex justify-center items-center"></div>
            )}
            {filteredTickets.length <= 0 && (
              <>
                <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center mt-10 uppercase text-xs font-sans font-bold mb-20">
                  There are no tickets
                </h2>
                <img
                  src={noTickets}
                  alt="No Ticket"
                  className="w-full h-[10rem] object-contain object-center"
                />
              </>
            )}
          </div>
        </div>
        <MessageThread isChatOpen={isChatOpen} audio={audio} />
      </div>
    </div>
  );
};

export default TicketsList;
