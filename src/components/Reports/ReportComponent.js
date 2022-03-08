import React, { useEffect, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef"
import Filters from "./Filters";

const ReportsComponent = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const [data, setData] = useState([]);
  const [openFilters,setOpenFilters] = useState(false)
  const filtersRef = useOnClickOutside(()=>{
    setOpenFilters(false)
  })

  //Filters =====================
  const [filters, setFilters] = useState({
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).toLocaleDateString(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      31
    ).toLocaleDateString(),
    brand: "",
    ticket_id: "",
    agent: "",
    category: "",
  });

  useEffect(() => {
    setData(
      filteredTickets.length >= 1
        ? filteredTickets
            .filter(
              (ticket) =>
                ticket.status
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.status, "gi")) &&
                ticket.category
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.category, "gi")) &&
                ticket.agent_name
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.agent, "gi")) &&
                ticket.branch_company
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.brand, "gi")) &&
                new Date(ticket.date).getTime() >=
                  new Date(
                    filters.startDate !== null && filters.startDate
                  ).getTime() &&
                new Date(ticket.date).getTime() <=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).getTime()
            )
        : []
    );
  }, [
    filteredTickets,
    filters.agent,
    filters.category,
    filters.client,
    filters.endDate,
    filters.startDate,
    filters.status,
    filters.brand,
  ]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 container w-[90%] md:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col tracking-wider relative">
      {/**Filters ============= */}
      <button
        onClick={() => setOpenFilters(true)}
        className="absolute top-2 left-2 h-6 w-6 rounded-md text-lg bg-transparent dark:text-slate-600 text-slate-500 focus:ring-0 focus:outline-none flex justify-center items-center space-x-2 font-semibold hover:opacity-80"
      >
        <HiOutlineDotsVertical />
      </button>
      <div
        ref={filtersRef}
        className={`absolute z-[999] w-[15rem] h-[20rem] shadow-xl top-9 left-2 ${
          openFilters ? "flex" : "hidden"
        } border dark:border-slate-600 border-slate-400 flex-col dark:bg-slate-800 bg-white rounded-xl p-4 space-y-4`}
      >
        <Filters setFilters={setFilters} filters={filters} />
        <h2 className="dark:text-slate-400 text-slate-600 text-center tracking-wider uppercase text-xs font-sans font-bold mt-20">
         Other Filters
        </h2>
      </div>

      {/**Stats ==================================== */}
      <TopCards data={data} setFilters={setFilters} filters={filters} />
      {/** Overview Report ============================ */}
      <div className="w-full rounded-xl bg-transparent grid grid-cols-3 lg:grid-cols-3 gap-4">
        <OverviewReport data={data} />
        <Tables data={data} />
      </div>
    </div>
  );
};

export default ReportsComponent;
