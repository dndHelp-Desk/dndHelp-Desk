import { FC } from "react";
import {
  BiCategoryAlt,
  BiUser,
  BiHash,
  BiCalendarWeek,
  BiPulse,
  BiUserPin,
  BiTagAlt,
  BiAlarm,
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
  filtersModal: boolean;
}

const Filters: FC<Props> = ({
  filters,
  setFilters,
  setList,
  contactsList,
  filtersModal,
}) => {
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  //Component ==============================
  return (
    <>
      <div className="col-span-1 h-10 min-w-[15rem] lg:min-w-0 w-full flex items-center relative z-[99]">
        <BiCalendarWeek className="text-slate-800 dark:text-slate-400 absolute h-10 left-3 z-[999]" />
        <DateFilter />
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative font-semibold dark:font-medium text-xs text-slate-700 dark:text-slate-400 border dark:border-slate-700 border-slate-400 group">
        <BiAlarm className="dark:text-slate-400 text-slate-900 text-lg absolute h-14 lg:h-10 left-3" />
        <span className="pl-10 capitalize">time</span>
        <div className="absolute top-[105%] left-0 z-[99] hidden group-hover:flex w-full h-fit rounded-sm  text-xs p-2 py-4 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-600 border-slate-300 focus:ring-0 focus:outline-none shadow-2xl drop-shadow-2xl space-y-4 overflow-hidden">
          {" "}
          <div className="w-full flex justify-between items-center space-x-2">
            <select
              onChange={(e) => {
                setFilters({
                  ...filters,
                  time: { ...filters.time, from: e.target.value },
                });
                window.localStorage.setItem(
                  "tickets_filters",
                  JSON.stringify({ ...filters, from: e.target.value })
                );
              }}
              className="h-full w-full rounded text-xs font-semibold dark:font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="1" selected={filters?.from === 1 ? true : false}>
                From
              </option>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24,
              ].map((hour) => {
                return (
                  <option
                    key={hour}
                    value={hour}
                    selected={filters?.time?.from === hour ? true : false}
                  >
                    {hour}:00 HR
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => {
                setFilters({
                  ...filters,
                  time: { ...filters.time, to: e.target.value },
                });
                window.localStorage.setItem(
                  "tickets_filters",
                  JSON.stringify({ ...filters, to: e.target.value })
                );
              }}
              className="h-full w-full rounded text-xs font-semibold dark:font-medium p-2 dark:bg-slate-800 bg-white dark:text-slate-400 text-slate-900 border  dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option
                value="24"
                selected={filters?.time?.to === 1 ? true : false}
              >
                To
              </option>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24,
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
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiCategoryAlt className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => {
            setFilters({ ...filters, category: e.target.value });
            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, category: e.target.value })
            );
          }}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10 font-semibold dark:font-medium"
        >
          <option value="" selected={filters?.category === "" ? true : false}>
            Category
          </option>
          {categories.length >= 1 &&
            categories?.map((category, index) => (
              <option
                key={index}
                className="capitalize"
                value={category?.name?.split(" ").join("")}
                selected={
                  filters?.category?.toLowerCase()?.replace(/\s/g, "") ===
                  category?.name?.toLowerCase()?.replace(/\s/g, "")
                    ? true
                    : false
                }
              >
                {category?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiPulse className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => {
            setFilters({ ...filters, status: e.target.value });
            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, status: e.target.value })
            );
          }}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none outline-none pl-10 font-semibold dark:font-medium capitalize"
        >
          <option value="" selected={filters?.status === 1 ? true : false}>
            Status
          </option>
          {["open", "solved", "reopened", "onhold"].map((opt) => {
            return (
              <option
                key={opt}
                value={opt}
                selected={
                  filters?.status?.toLowerCase()?.replace(/\s/g, "") ===
                  opt.toLowerCase()?.replace(/\s/g, "")
                    ? true
                    : false
                }
              >
                {opt}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiTagAlt className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => {
            setFilters({ ...filters, priority: e.target.value });
            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, priority: e.target.value })
            );
          }}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none outline-none pl-10 font-semibold dark:font-medium capitalize"
        >
          <option value="">Priority</option>
          <option value="" selected={filters?.status === 1 ? true : false}>
            priority
          </option>
          {["low", "medium", "high", "urgent"].map((opt) => {
            return (
              <option
                key={opt}
                value={opt}
                selected={
                  filters?.priority?.toLowerCase()?.replace(/\s/g, "") ===
                  opt.toLowerCase()?.replace(/\s/g, "")
                    ? true
                    : false
                }
              >
                {opt}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiUser className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <select
          onChange={(e) => {
            setFilters({ ...filters, agent: e.target.value });
            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, agent: e.target.value })
            );
          }}
          className="h-full w-full rounded text-xs p-2 dark:bg-slate-900 bg-slate-100 text-slate-800 dark:text-slate-400 dark:border-slate-700 border-slate-400 focus:ring-0 focus:outline-none pl-10 font-semibold dark:font-medium"
        >
          <option value="" selected={filters?.agent === "" ? true : false}>
            Agents ...
          </option>
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
                  selected={
                    filters?.agent?.toLowerCase()?.replace(/\s/g, "") ===
                    agent?.email?.toLowerCase()?.replace(/\s/g, "")
                      ? true
                      : false
                  }
                >
                  {agent.name}
                </option>
              ))}
        </select>
      </div>
      <CompanyFilter
        setList={setList}
        contactsList={contactsList}
        filtersModal={filtersModal}
      />
      <div className="col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[15rem] lg:min-w-0 flex items-center rounded relative">
        <BiHash className="text-slate-800 dark:text-slate-400 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="ticket_id"
          id="ticket_id"
          onChange={(e) => {
            setFilters({ ...filters, ticket_id: e.target.value });
            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, ticket_id: e.target.value })
            );
          }}
          value={filters?.ticket_id}
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 dark:text-slate-400 text-slate-800 placeholder:text-slate-800 dark:placeholder:text-slate-400 placeholder:text-xs text-sm pl-10 font-semibold dark:font-medium"
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
          onChange={(e) => {
            setFilters({ ...filters, complainant_number: e.target.value });

            window.localStorage.setItem(
              "tickets_filters",
              JSON.stringify({ ...filters, complainant_number: e.target.value })
            );
          }}
          value={filters?.complainant_number}
          className="h-full w-full bg-transparent outline-none focus:outline-none dark:border-slate-700 border-slate-400 rounded duration-300 dark:text-slate-400 text-slate-800 placeholder:text-slate-800 dark:placeholder:text-slate-400 placeholder:text-xs text-sm pl-10 font-semibold dark:font-medium"
          placeholder="Customer's Number ..."
        />
      </div>
    </>
  );
};

export default Filters;
