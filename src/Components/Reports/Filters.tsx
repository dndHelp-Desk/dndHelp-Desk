import { FC } from "react";
import { BiCategoryAlt, BiUser, BiCalendarWeek, BiPulse } from "react-icons/bi";
import DateFilter from "./DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "./../../Redux/store";
import CompanyFilter from "./CompanyFilter";

interface Props {
  filters: any;
  setFilters: any;
  setList: any;
  contactsList: any;
}

const Filters: FC<Props> = ({ filters, setFilters, setList, contactsList }) => {
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  //Component ==============================
  return (
    <>
      <div className="md:max-w-[14rem] h-14 lg:h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative z-[99]">
        <BiCalendarWeek className="dark:text-slate-400 text-slate-900 absolute h-14 lg:h-10 left-3 z-[9999]" />
        <DateFilter filters={filters} setFilters={setFilters} />
      </div>

      <div className="md:max-w-[14rem] h-14 lg:h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiCategoryAlt className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
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
      <div className="md:max-w-[14rem] h-14 lg:h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiUser className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Agents</option>
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
      <CompanyFilter setList={setList} contactsList={contactsList} />
      <div className="md:max-w-[14rem] h-14 lg:h-10 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiPulse className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="onhold">On Hold</option>
          <option value="reopened">Reopened</option>
          <option value="solved">Resolved</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
