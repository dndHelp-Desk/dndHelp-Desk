import { FC } from "react";
import {
  BiCategoryAlt,
  BiUser,
  BiHash,
  BiCalendarWeek,
  BiPulse,
  BiUserPin,
  BiTagAlt,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import CompanyFilter from "./CompanyFilter";
import DateFilter from "./DatePicker";

interface Props {
  filters: any;
  setFilters: (filetrs: any) => any;
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
      <div className="col-span-1 h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative z-[9999]">
        <BiCalendarWeek className="text-slate-800 dark:text-slate-400 absolute h-10 left-3 z-[999]" />
        <DateFilter />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiCategoryAlt className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10 font-medium"
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
        <BiPulse className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none outline-none pl-10 font-medium"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="onhold">On Hold</option>
          <option value="reopened">Reopened</option>
          <option value="solved">Resolved</option>
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiTagAlt className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none outline-none pl-10 font-medium"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiUser className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10 font-medium"
        >
          <option value="">Agents ...</option>
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
      <CompanyFilter setList={setList} contactsList={contactsList} />
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiHash className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) =>
            setFilters({ ...filters, ticket_id: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 dark:text-slate-400 text-slate-800 placeholder:text-slate-800 dark:placeholder:text-slate-400 placeholder:text-xs text-sm pl-10 font-medium"
          placeholder="Ticket-ID ..."
        />
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiUserPin className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="complainant_number"
          id="complainant_number"
          onChange={(e) =>
            setFilters({ ...filters, complainant_number: e.target.value })
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 dark:text-slate-400 text-slate-800 placeholder:text-slate-800 dark:placeholder:text-slate-400 placeholder:text-xs text-sm pl-10 font-medium"
          placeholder="Customer's Number ..."
        />
      </div>
    </>
  );
};

export default Filters;
