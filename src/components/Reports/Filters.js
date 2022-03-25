import React from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsCalendar2Week,
  BsCheckSquare,
} from "react-icons/bs";
import DateFilter from "./DatePicker";
import { useSelector } from "react-redux";

const Filters = ({ filters, setFilters }) => {
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const categories = useSelector((state) => state.Tickets.categories);

  //Component ==============================
  return (
    <>
      <div className="md:max-w-[14rem] h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsSearch className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Category</option>
          {categories.length >= 1 &&
            categories.map((category, index) => (
              <option
                key={index}
                className="capitalize"
                value={category
                  .split(" ")
                  .join("")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")}
              >
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-[#1e293b18] bg-[#e2e8f059] dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
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
      <div className="md:max-w-[14rem] h-10 dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:border-slate-800 border-slate-300 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded-md duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Brand ..."
        />
      </div>
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded-md relative">
        <BsCheckSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded-md text-xs p-2 dark:bg-[#1e293b18] bg-[#e2e8f059] dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="on hold">On Hold</option>
          <option value="solved">Resolved</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
