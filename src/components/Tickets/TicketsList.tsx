import { FC, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { markAsSeen } from "../Data_Fetching/TicketsnUserData";
import { BsStopFill } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft, BiArrowBack } from "react-icons/bi";
import { setThreadId } from "../../Redux/Slices/Tickets_n_Settings_Slice";
import MessageThread from "./MessageThread";
import Navbar from "./Navbar";
import noTickets from "./images/no-userss.svg";
import NewTicket from "./NewTicket";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  setDelete: any;
  deleteArray: any;
  setModal: any;
  newTicketModal: () => any;
}

const TicketsList: FC<Props> = ({
  setDelete,
  deleteArray,
  setModal,
  newTicketModal,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );
  const fetchedTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const ticketsComponentDates = useSelector(
    (state: RootState) => state.Tickets.ticketsComponentDates
  );
  const unread = useSelector((state: RootState) => state.Tickets.unread);
  const [isChatOpen, setChat] = useState<boolean>(false);
  const [audio, audioUrl] = useState<string | any>("");
  const [loadMore, setLimit] = useState<number | any>(50);
  //Filters =====================
  const [filters, setFilters] = useState({
    brand: "",
    ticket_id: "",
    agent: "",
    category: "",
    complainant_number: "",
    status: "",
    fcr: "no",
    reopened: false,
    overdue: false,
    hasRecording: false,
  });

  const filteredTickets: any = useMemo(() => {
    return fetchedTickets.length >= 1
      ? fetchedTickets?.filter(
          (ticket) =>
            ticket?.status
              .replace(/\s/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .match(new RegExp(filters.status, "gi")) &&
            ticket?.category
              .replace(/\s/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .match(new RegExp(filters.category, "gi")) &&
            ticket?.agent_email
              .replace(/\s/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .match(new RegExp(filters.agent, "gi")) &&
            ticket?.branch_company
              .replace(/\s/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .match(new RegExp(filters.brand, "gi")) &&
            ticket?.status
              .replace(/\s/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .match(new RegExp(filters.status, "gi")) &&
            Number(new Date(ticket.date).getTime()) >=
              Number(new Date(ticketsComponentDates.startDate).getTime()) &&
            Number(new Date(ticket.date).getTime()) <=
              new Date(
                new Date(ticketsComponentDates.endDate).setDate(
                  new Date(ticketsComponentDates.endDate).getDate() + 1
                )
              ).getTime() &&
            ticket?.complainant_number
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(
                filters.complainant_number.toLowerCase().replace(/\s/g, "")
              ) === true &&
            ticket?.ticket_id
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(filters.ticket_id?.toLowerCase().replace(/\s/g, "")) ===
              true
        )
      : [];
  }, [
    fetchedTickets,
    filters.agent,
    filters.brand,
    filters.category,
    filters.complainant_number,
    ticketsComponentDates.endDate,
    ticketsComponentDates.startDate,
    filters.status,
    filters.ticket_id,
  ]);

  //Loop Through Each Tickects =================
  const tickets =
    filteredTickets.length >= 1 &&
    filteredTickets.slice(loadMore - 50, loadMore).map((ticket: any) => {
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
          role="row"
          key={ticket.id}
          className={`w-full h-[5rem] custom-shadow border dark:border-slate-700 border-slate-400 relative rounded-l dark:bg-[#182235] bg-slate-50 p-2 space-x-2 flex shadow-sm snap_childTwo  ${
            ticket.ticket_id === threadId
              ? "border-r-2 dark:border-r-blue-600 border-r-blue-600"
              : ""
          }`}
        >
          {/**Indicate if it's new messsage ================*/}
          {unread.length >= 1 &&
            unread.filter((data) => data.ticket_id === ticket.ticket_id)
              .length >= 1 && (
              <div className="absolute left-[0.15rem] top-[0.15rem] flex justify-center items-center tracking-wide rounded-sm w-12 bg-blue-600 text-[0.6rem] text-slate-200">
                <span>
                  New :{" "}
                  {unread.length >= 1 &&
                    unread.filter((data) => data.ticket_id === ticket.ticket_id)
                      .length}
                </span>
              </div>
            )}

          {/**Ticket Details ========================================== */}
          <div className="flex relative h-full w-full px-1 cursor-default overflow-hidden">
            {/**Mark or Unmark Ticket ========================================== */}
            <div className="h-full w-[9%] flex justify-between items-center px-2">
              <input
                type="checkbox"
                className="rounded-[0.18rem]  text-blue-600 h-3 w-3 checked:bg-blue-600 shadow-sm dark:border-slate-800 border-slate-500 dark:bg-slate-400 dark:checked:bg-blue-600 bg-slate-200 focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
                name="mark"
                id="mark"
                checked={
                  deleteArray.includes(ticket.ticket_id) === true ? true : false
                }
                onChange={(e) =>
                  e.target.checked === true
                    ? setDelete([...deleteArray, ticket.ticket_id])
                    : setDelete(
                        deleteArray.filter(
                          (data: any) => data !== ticket.ticket_id
                        )
                      )
                }
              />
            </div>
            <div
              onClick={() => {
                dispatch(setThreadId(ticket.ticket_id));
                window.localStorage.setItem(
                  "threadId",
                  JSON.stringify(threadId)
                );
                setChat(true);
                unread.length >= 1 &&
                  unread
                    .filter((data) => data.ticket_id === ticket.ticket_id)
                    .forEach((message) => {
                      markAsSeen(message.id, "read");
                    });
                /**Get The Recording ================== */
                if (
                  (ticket.status === "solved" &&
                    ticket.hasRecording === true) ||
                  (ticket.status === "solved" && ticket.hasRecording === "true")
                ) {
                  const storage = getStorage();
                  const recordingRef = ref(
                    storage,
                    `/${company_details.name}/${ticket.ticket_id}`
                  );
                  getDownloadURL(recordingRef).then((url) => {
                    audioUrl(url);
                  });
                }
              }}
              className="h-full w-[90%] flex flex-col justify-center space-y-1 relative"
            >
              <abbr title={ticket.ticket_id}>
                <p className="dark:text-slate-300 text-slate-900 text-[0.7rem] font-bold dark:font-semibold font-sans uppercase whitespace-nowrap w-full overflow-hidden overflow-ellipsis">
                  <span className="">
                    {ticket.category} | {ticket.ticket_id}
                  </span>
                </p>
              </abbr>
              <p className="dark:text-slate-400 max-w-[15rem] text-slate-700 text-xs tracking-wide font-base capitalize font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
                <abbr title={ticket.branch_company}>
                  &rArr; {ticket.branch_company}
                </abbr>
              </p>
              {/**Indicate The ticket that is solved or  overdue and open ================*/}
              <small className="dark:text-slate-400 text-slate-500 flex items-center space-x-1 text-[0.6rem] whitespace-nowrap">
                <span
                  className={`${
                    new Date(ticket.due_date).getTime() <=
                      new Date().getTime() &&
                    ticket.status &&
                    ticket.status.toLowerCase() === "open"
                      ? "text-red-600"
                      : (ticket.status.toLowerCase() === "open" &&
                          new Date(ticket.due_date).getTime() >
                            new Date().getTime()) ||
                        ticket.status.toLowerCase() === "on hold"
                      ? "text-slate-500"
                      : ticket.status &&
                        ticket.status.toLowerCase() === "solved"
                      ? "text-blue-600"
                      : ""
                  } `}
                >
                  <BsStopFill />
                </span>{" "}
                <span>Due on {new Date(ticket.due_date).toLocaleString()}</span>
              </small>
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
        className={`flex flex-col lg:flex-row bg-transparent rounded-xl   ${
          isChatOpen && "gap-4"
        } lg:space-y-0 lg:space-x-2 space-x-0 ralative`}
      >
        {/**Back To Main List On Small Screens ====================== */}
        <div
          onClick={() => setChat(false)}
          className={`dark:text-slate-400 text-slate-800 font-bold mt-2 py-1 h-2 w-full text-xl hover:opacity-80 rounded flex lg:hidden items-center space-x-1 cursor-pointer ${
            !isChatOpen && "hidden"
          }`}
        >
          <BiArrowBack />
          <span className="text-xs">Back</span>
        </div>

        <div
          className={`w-full lg:w-[40%] h-[45rem] flex flex-col justify-between ${
            isChatOpen ? "hidden lg:flex lg:opacity-100 opacity-0" : ""
          }`}
        >
          <Navbar
            deleteArray={deleteArray}
            setDelete={setDelete}
            setModal={setModal}
            filters={filters}
            setFilters={setFilters}
          />
          <div className="w-full flex-[15] flex flex-col overflow-hidden">
            <div
              role="table"
              className="w-full h-[92%] space-y-2 overflow-hidden overflow-y-scroll scroll-snap pr-1"
            >
              {tickets}
              {filteredTickets.length <= 0 && (
                <>
                  <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center mt-[4.5rem] uppercase text-xs font-sans font-bold mb-20">
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

            {/**Pagination ================================ */}
            <div className="h-[8%] w-full bottom-0 flex flex-col justify-center items-center">
              <div className="h-8 w-56 grid grid-cols-4 gap-1 dark:bg-[#182235] bg-slate-50 py-1 rounded border dark:border-slate-700 border-slate-400">
                <button
                  onClick={() => {
                    setLimit(loadMore <= 99 ? loadMore - 0 : loadMore - 50);
                  }}
                  className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
                >
                  <BiChevronLeft />
                </button>
                <div className="col-span-2 dark:text-slate-300 text-slate-800 font-bold text-xs tracking-wider flex items-center justify-center border-l border-r dark:border-slate-700 border-slate-300 overflow-hidden px-1">
                  <p className="text-[0.65rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {loadMore - 50 === 0 ? 1 : loadMore - 50}{" "}
                    <span className="text-slate-500">-</span> {loadMore}{" "}
                    <span className="text-slate-500">of </span>
                    {filteredTickets.length}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setLimit(
                      fetchedTickets.length > loadMore ? loadMore + 50 : 50
                    );
                  }}
                  className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
                >
                  <BiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <MessageThread isChatOpen={isChatOpen} audio={audio} />
      </div>
    </div>
  );
};

export default TicketsList;
