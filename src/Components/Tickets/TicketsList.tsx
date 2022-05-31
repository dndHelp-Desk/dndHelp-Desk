import { FC, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { markAsSeen } from "../Data_Fetching/TicketsnUserData";
import { BiChevronRight, BiChevronLeft, BiPulse } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { setThreadId } from "../../Redux/Slices/Tickets_n_Settings_Slice";
import Navbar from "./Navbar";
import noTickets from "./images/no-userss.svg";
import NewTicket from "./NewTicket";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  setDelete: any;
  deleteArray: any;
  setModal: any;
  audioUrl: any;
  setChat: any;
  newTicketModal: () => any;
}

const TicketsList: FC<Props> = ({
  setDelete,
  deleteArray,
  setModal,
  newTicketModal,
  setChat,
  audioUrl,
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
  const [loadMore, setLimit] = useState<number | any>(50);

  //Filters =====================
  const [contactsList, setList] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    ticket_id: "",
    agent: "",
    category: "",
    complainant_number: "",
    status: "",
    priority: "",
    fcr: "no",
    reopened: false,
    overdue: false,
    hasRecording: false,
  });

  const filteredTickets: any = useMemo(() => {
    setLimit(50);
    return fetchedTickets.length >= 1
      ? fetchedTickets
          ?.filter((row) =>
            contactsList?.every(
              (item) =>
                item.toLowerCase()?.replace(/\s/g, "") !==
                row.branch_company?.toLowerCase()?.replace(/\s/g, "")
            )
          )
          ?.filter(
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
              ticket?.status
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi")) &&
              ticket?.priority
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters?.priority, "gi")) &&
              ticket.date >= Number(ticketsComponentDates.startDate) &&
              ticket.date <= Number(ticketsComponentDates.endDate) + 86400000 &&
              ticket?.complainant_number
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(
                  filters.complainant_number.toLowerCase().replace(/\s/g, "")
                ) === true &&
              ticket?.ticket_id
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(
                  filters.ticket_id?.toLowerCase().replace(/\s/g, "")
                ) === true
          )
      : [];
  }, [fetchedTickets, ticketsComponentDates, filters, contactsList]);

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
          className={`w-full h-fit border-t last:border-b dark:border-[#33415583] border-slate-300 relative py-4 p-2 space-x-2 flex snap_childTwo hover:bg-slate-200/[0.6] dark:hover:bg-[#182235] transition-all ${
            ticket.ticket_id === threadId
              ? "bg-slate-200/[0.6] dark:bg-[#182235]"
              : "bg-inherit"
          }`}
        >
          {/**Indicate if it's new messsage ================*/}
          {unread.length >= 1 &&
            unread.filter((data) => data.ticket_id === ticket.ticket_id)
              .length >= 1 && (
              <div className="absolute left-[0.15rem] top-[0.15rem] flex justify-center items-center tracking-wide rounded-sm h-5 w-12 bg-blue-600 text-[0.65rem] font-medium text-white overflow-hidden">
                <span>
                  New :{" "}
                  {unread.length >= 1 &&
                    unread.filter((data) => data.ticket_id === ticket.ticket_id)
                      .length}
                </span>
              </div>
            )}

          {/**Ticket Details ========================================== */}
          <div className="flex relative h-full w-full px-1 cursor-pointer overflow-hidden">
            {/**Mark or Unmark Ticket ========================================== */}
            <div className="h-full w-[9%] flex justify-between items-center px-2">
              <input
                type="checkbox"
                className="rounded-[0.18rem]  text-blue-600 h-3 w-3 checked:bg-blue-600 shadow-sm dark:border-slate-600 border-slate-400 dark:checked:bg-blue-600 bg-slate-50 dark:bg-slate-700 focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
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
              className="h-full w-[90%] flex items-center space-x-4 relative"
            >
              <div className="h-8 w-9 rounded-sm border border-slate-400 dark:border-slate-600 dark:bg-slate-700 bg-slate-50 flex justify-center items-center text-sm uppercase font-bold text-slate-800 dark:text-slate-300">
                <abbr title="Origin">
                  {ticket?.origin === "Help Desk" ? (
                    <HiOutlineMail />
                  ) : (
                    <HiOutlineMail />
                  )}
                </abbr>
              </div>
              <div className="h-full w-full flex flex-col justify-center space-y-0">
                <div className="dark:text-slate-300 text-slate-900 text-[0.7rem] font-bold dark:font-semibold font-sans uppercase whitespace-nowrap w-full overflow-hidden overflow-ellipsis tracking-normal flex justify-between">
                  <p className="capitalize  w-[60%] overflow-hidden">
                    {ticket.category}
                  </p>
                  <p className=" text-[0.65rem]">{ticket.ticket_id}</p>
                </div>
                <div className="dark:text-slate-400 w-[60%] pr-4 flex flex-row items-center space-x-2 text-slate-700 text-xs font-base cadivitalize font-medium overflow-hidden whitespace-nowrap overflow-ellipsis tracking-normal">
                  <abbr title={ticket.branch_company}>
                    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                      {ticket.branch_company}
                    </span>
                  </abbr>
                </div>
                {/**Indicate The ticket that is solved or  overdue and open ================*/}
                <small className="dark:text-slate-400 text-slate-500 flex items-center space-x-[0.15rem] text-[0.6rem] whitespace-nowrap">
                  <span
                    className={`text-sm ${
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
                    <BiPulse />
                  </span>{" "}
                  <span>
                    {ticket?.status === "solved"
                      ? `Solved within  [ ${
                          (
                            Number(
                              Number(
                                Number(ticket?.closed_time) -
                                  Number(ticket?.date)
                              ) / 60000
                            ) / 60
                          )
                            ?.toString()
                            ?.split(".")[0]
                        }hr : ${(
                          Number(
                            Number(
                              Number(ticket?.closed_time) - Number(ticket?.date)
                            ) / 60000
                          ) % 60
                        )?.toFixed(0)}min ]`
                      : `Due by ${
                          new Date(ticket.due_date)
                            .toLocaleString()
                            ?.split(",")[1]
                        }, ${
                          new Date(ticket.due_date)
                            .toLocaleString()
                            ?.split(",")[0]
                        }`}
                  </span>
                </small>
              </div>
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
      <div className="w-full h-[47rem] flex flex-col justify-between p-1">
        <Navbar
          deleteArray={deleteArray}
          setDelete={setDelete}
          setModal={setModal}
          filters={filters}
          setFilters={setFilters}
          setList={setList}
          contactsList={contactsList}
        />
        <div className="w-full h-[43.5rem] flex flex-col justify-between overflow-hidden">
          <div
            role="table"
            className="w-full h-[40.5rem] flex flex-col overflow-hidden overflow-y-scroll scroll-snap pr-1"
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
          <div className="h-[3rem] bg-inherit w-full z-[9] bottom-0 flex flex-col justify-center items-center overflow-hidden">
            <div className="h-8 w-56 grid grid-cols-4 gap-1 dark:bg-[#182235] bg-slate-50 py-1 rounded-sm border dark:border-slate-700 border-slate-400">
              <button
                onClick={() => {
                  setLimit(loadMore <= 99 ? loadMore - 0 : loadMore - 50);
                }}
                className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
              >
                <BiChevronLeft />
              </button>
              <div className="col-span-2 dark:text-slate-300 text-slate-800 font-bold text-xs tracking-wider flex items-center justify-center border-l border-r dark:border-slate-700 border-slate-400 overflow-hidden px-1">
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
    </div>
  );
};

export default TicketsList;
