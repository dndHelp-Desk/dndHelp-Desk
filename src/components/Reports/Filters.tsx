import { FC } from "react";
import {
  BsSearch,
  BsPerson,
  BsShopWindow,
  BsCalendar2Week,
  BsCheckSquare,
} from "react-icons/bs";
import DateFilter from "./DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "./../../Redux/store";

export interface Props {
  filters: any;
  setFilters: any;
}

const Filters: FC<Props> = ({ filters, setFilters }) => {
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  //Component ==============================
  return (
    <>
      <div className="md:max-w-[14rem] h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative">
        <BsCalendar2Week className="text-slate-500 absolute h-10 left-3 z-[999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsSearch className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-800 bg-white dark:text-slate-500 text-slate-500 border  dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10 shadow"
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
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsPerson className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-800 bg-white dark:text-slate-500 text-slate-500 border dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10 shadow"
        >
          <option value="">All Agents</option>
          {allMembers.length >= 1 &&
            allMembers
              .map((agent) => agent?.access === "agent" && agent)
              .filter(Boolean)
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((agent, index) => (
                <option key={index} className="capitalize" value={agent.email}>
                  {agent.name}
                </option>
              ))}
        </select>
      </div>
      <div className="md:max-w-[14rem] h-10 dark:bg-slate-800 bg-white  border  dark:border-slate-700 border-slate-300  w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative shadow">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 rounded duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Brand ..."
        />
      </div>
      <div className="md:max-w-[14rem] h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BsCheckSquare className="text-slate-500 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-800 bg-white dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10 shadow"
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
