import { FC } from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsReceiptCutoff,
  BsCalendar2Week,
  BsCheckSquare,
  BsInfoSquare,
  BsFilter,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import DateFilter from "./DatePicker";

interface Props {
  filters: any;
  setFilters: (filetrs: any) => any;
  setTickets: any;
}

const Filters: FC<Props> = ({ filters, setFilters, setTickets }) => {
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const fetchedTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsSearch className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Category</option>
          {categories.length >= 1 &&
            categories.map((category, index) => (
              <option
                key={index}
                className="capitalize"
                value={category.split(" ").join("")}
              >
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsCheckSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="on hold">On Hold</option>
          <option value="solved">Resolved</option>
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsInfoSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10">
          <option
            onClick={() =>
              setFilters({
                ...filters,
                overdue: false.valueOf,
                fcr: false,
                reopened: false,
                hasRecording: false,
              })
            }
            value=""
          >
            Others
          </option>
          <option
            onClick={() => setFilters({ ...filters, fcr: "yes" })}
            value=""
          >
            First Contact Resolution
          </option>
          <option
            onClick={() => setFilters({ ...filters, overdue: true })}
            value=""
          >
            Overdue
          </option>
          <option
            onClick={() => setFilters({ ...filters, reopened: true })}
            value=""
          >
            Re-Opened
          </option>
          <option
            onClick={() => setFilters({ ...filters, hasRecording: true })}
            value=""
          >
            Has Recording
          </option>
        </select>
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">All Agents ...</option>
          {allMembers.length >= 1 &&
            allMembers
              .map((agent) => agent.access === "agent" && agent)
              .filter(Boolean)
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((agent, index) => (
                <option key={index} className="capitalize" value={agent.email}>
                  {agent.name}
                </option>
              ))}
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          value={filters.brand}
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Brand ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsReceiptCutoff className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) =>
            setFilters({ ...filters, ticket_id: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Ticket-ID ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="complainant_number"
          id="complainant_number"
          onChange={(e) =>
            setFilters({ ...filters, complainant_number: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Customer's Number ..."
        />
      </div>

      {/**Apply Filters =========================== */}
      <button
        onClick={() => {
          setTickets(
            fetchedTickets.length >= 1
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
                      Number(new Date(filters.startDate).getTime()) &&
                    Number(new Date(ticket.date).getTime()) <=
                      new Date(
                        new Date(filters.endDate).setDate(
                          new Date(filters.endDate).getDate() + 1
                        )
                      ).getTime() &&
                    ticket?.complainant_number
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .includes(
                        filters.complainant_number
                          .toLowerCase()
                          .replace(/\s/g, "")
                      ) === true &&
                    ticket?.ticket_id
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .includes(
                        filters.ticket_id?.toLowerCase().replace(/\s/g, "")
                      ) === true
                )
              : []
          );
        }}
        className="col-span-1 h-10 bg-blue-700 text-slate-100 text-center text-base w-full min-w-[15rem] lg:min-w-0  rounded outline-none focus:outline-none hover:opacity-90 transition-all flex justify-center items-center space-x-2"
      >
        <BsFilter />
        <span>Apply</span>
      </button>
    </>
  );
};

export default Filters;
