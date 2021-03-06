import { FC } from "react";
import {
  BiCategoryAlt,
  BiUser,
  BiPulse,
  BiAlarm,
  BiGitPullRequest,
} from "react-icons/bi";
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
      <div className=" w-full col-span-1 h-14 lg:h-10 flex items-center rounded relative text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none group">
        <BiAlarm className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <div className="pl-8 w-full flex justify-between items-center">
          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                time: { ...filters.time, from: e.target.value },
              })
            }
            className="h-full w-full text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border-0 border-r  dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none"
          >
            <option value="1">From</option>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
            ].map((hour) => {
              return (
                <option key={hour} value={hour}>
                  {hour}:00 HR
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                time: { ...filters.time, to: e.target.value },
              })
            }
            className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900  border-0 focus:border-0 focus:ring-0 focus:outline-none"
          >
            <option value="24">To</option>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
            ].map((hour) => {
              return (
                <option key={hour} value={hour}>
                  {hour}:00 HR
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className=" w-full col-span-1 h-14 lg:h-10 flex items-center rounded relative">
        <BiCategoryAlt className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Category</option>
          {categories.length >= 1 &&
            categories?.map((category, index) => (
              <option
                key={index}
                className="capitalize"
                value={category?.name
                  .split(" ")
                  .join("")
                  ?.replace(/\(/g, "")
                  ?.replace(/\)/g, "")}
              >
                {category?.name}
              </option>
            ))}
        </select>
      </div>
      <div className=" w-full col-span-1 h-14 lg:h-10 flex items-center rounded relative">
        <BiUser className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none pl-10"
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

      <div className=" w-full col-span-1 h-14 lg:h-10 flex items-center rounded relative">
        <BiPulse className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="onhold">On Hold</option>
          <option value="reopened">Reopened</option>
          <option value="solved">Resolved</option>
        </select>
      </div>

      {/**Filter By Traffic Source ========================== */}
      <div className=" w-full col-span-1 h-14 lg:h-10 flex items-center rounded relative">
        <BiGitPullRequest className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 dark:border-slate-750 border-slate-300 focus:ring-0 focus:outline-none pl-10"
        >
          <option value="">Source</option>
          <option value="open">Email</option>
          <option value="onhold">Web Chat</option>
          <option value="reopened">WhatsApp</option>
          <option value="reopened">Messanger</option>
          <option value="solved">Twitter</option>
          <option value="solved">Slack</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
