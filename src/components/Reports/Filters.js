import React from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsReceiptCutoff,
  BsCalendar2Week,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import DateFilter from "./DatePicker";
import { filter} from "../../store/TicketsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);


  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-12 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsSearch className="text-slate-500 absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="category"
          id="category"
          onChange={(e) =>
            dispatch(filter({ ...filters, category: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-800 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Category ..."
        />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="agent"
          id="agent"
          onChange={(e) =>
            dispatch(filter({ ...filters, agent: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-800 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Agent Name ..."
        />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) =>
            dispatch(filter({ ...filters, brand: e.target.value }))
          }
          value={filters.brand}
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-800 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Company / Brand ..."
        />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsReceiptCutoff className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) =>
            dispatch(filter({ ...filters, ticket_id: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-800 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Ticket-ID ..."
        />
      </div>
    </>
  );
};

export default Filters;
