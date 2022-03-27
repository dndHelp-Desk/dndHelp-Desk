import React from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsReceiptCutoff,
  BsCalendar2Week,
  BsCheckSquare,
  BsInfoSquare,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import DateFilter from "./DatePicker";

const Filters = ({ filters, setFilters }) => {
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const categories = useSelector((state) => state.Tickets.categories);

  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-12 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsSearch className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-200 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
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
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsCheckSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-200 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="on hold">On Hold</option>
          <option value="solved">Resolved</option>
        </select>
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsInfoSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, others: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-200 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value={true}>Others</option>
          <option value="yes">First Contact Resolution</option>
          <option value="overdue">Overdue</option>
          <option value="reopened">Re-Opened</option>
        </select>
      </div>

      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-200 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">All Agents ...</option>
          {allMembers.length >= 1 &&
            allMembers
              .map((agent) => agent.access === "agent" && agent)
              .filter(Boolean)
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((agent, index) => (
                <option
                  key={index}
                  className="capitalize"
                  value={agent.email}
                >
                  {agent.name}
                </option>
              ))}
        </select>
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          value={filters.brand}
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Brand ..."
        />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsReceiptCutoff className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) =>
            setFilters({ ...filters, ticket_id: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Ticket-ID ..."
        />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-slate-200 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="complainant_number"
          id="complainant_number"
          onChange={(e) =>
            setFilters({ ...filters, complainant_number: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Customer's Number ..."
        />
      </div>
    </>
  );
};

export default Filters;
