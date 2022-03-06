import React from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsReceiptCutoff,
  BsCalendar2Week,
} from "react-icons/bs";
import DateFilter from "./DatePicker";

const Filters = ({ filters, setFilters }) => {

  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsSearch className="text-slate-500 absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="category"
          id="category"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Category ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="agent"
          id="agent"
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Agent Name ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Brand ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsReceiptCutoff className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) =>
            setFilters({ ...filters, ticket_id: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Ticket-ID ..."
        />
      </div>
      <div className="col-span-1 h-10 bg-blue-700 w-full text-slate-300 min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative py-1">
        <button className="outline-none focus:outline-none hover:opacity-90 text-sm font-semibold w-2/4 h-full border-r border-slate-400">
          Copy
        </button>
        <button className="outline-none focus:outline-none hover:opacity-80 text-sm font-semibold w-2/4 h-full">
          Export
        </button>
      </div>
    </>
  );
};

export default Filters;
