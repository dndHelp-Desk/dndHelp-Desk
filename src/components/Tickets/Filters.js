import React from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsReceiptCutoff,
  BsCalendar2Week,
  BsCheckSquare,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import DateFilter from "./DatePicker";
import { filter } from "../../store/TicketsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);
  const settings = useSelector((state) => state.Tickets.settings);
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const categories = settings.length >= 1 && settings[0].categories;

  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-12 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter />
      </div>
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsSearch className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) =>
            dispatch(filter({ ...filters, category: e.target.value }))
          }
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-white dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
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
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsCheckSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) =>
            dispatch(filter({ ...filters, status: e.target.value }))
          }
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-white dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="on hold">On Hold</option>
          <option value="solved">Resolved</option>
          <option value="reopened">Re-Opened</option>
        </select>
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) =>
            dispatch(filter({ ...filters, agent: e.target.value }))
          }
          className="h-full w-full rounded-md text-xs p-2 dark:bg-slate-900 bg-white dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Agent Name</option>
          {allMembers.length >= 1 &&
            allMembers
              .map((agent) => agent.access === "agent" && agent.name)
              .filter(Boolean)
              .sort((a, b) => (a < b ? -1 : 1))
              .map((agent, index) => (
                <option
                  key={index}
                  className="capitalize"
                  value={agent.split(" ").join("")}
                >
                  {agent}
                </option>
              ))}
        </select>
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
          placeholder="Brand ..."
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
      <div className="col-span-1 h-12 dark:bg-slate-900 bg-white w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-lg relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="complainant_number"
          id="complainant_number"
          onChange={(e) =>
            dispatch(filter({ ...filters, complainant_number: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-800 border-slate-400 rounded-lg duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Customer's Number ..."
        />
      </div>
      <div className="col-span-1 h-12 bg-tranpsarent w-full min-w-[15rem] lg:min-w-0 flex items-center justify-between rounded-lg relative p-2">
        <label className="dark:text-slate-300 text-slate-600 text-xs space-x-1" htmlFor="fcr">
          <input
            type="checkbox"
            name="fcr"
            id="fcr"
            onChange={(e) =>
              dispatch(filter({ ...filters, fcr: e.target.value }))
            }
            className="h-4 w-4 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm"
            placeholder="Customer's Number ..."
          />
          <span>FCR</span>
        </label>
        <label className="dark:text-slate-300 text-slate-600 text-xs space-x-1" htmlFor="fcr">
          <input
            type="checkbox"
            name="fcr"
            id="fcr"
            onChange={(e) =>
              dispatch(filter({ ...filters, fcr: e.target.value }))
            }
            className="h-4 w-4 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm"
            placeholder="Customer's Number ..."
          />
          <span>Reopened</span>
        </label>
        <label className="dark:text-slate-300 text-slate-600 text-xs space-x-1" htmlFor="fcr">
          <input
            type="checkbox"
            name="fcr"
            id="fcr"
            onChange={(e) =>
              dispatch(filter({ ...filters, fcr: e.target.value }))
            }
            className="h-4 w-4 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm"
            placeholder="Customer's Number ..."
          />
          <span>Overdue</span>
        </label>
      </div>
    </>
  );
};

export default Filters;
