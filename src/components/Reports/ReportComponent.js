import React, { useEffect, useState } from "react";
import Tables from "./Tables";
import Filters from "./Filters";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector } from "react-redux";

const ReportsComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const filtersModalRef = useOnClickOutside(() => {
    setShowFilters(false);
  });

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
    brand: "f",
    ticket_id: "s",
    agent: "s",
    category: "s",
  });

  useEffect(() => {
    const data =
      filteredTickets.length >= 1
        ? filteredTickets
            .filter(
              (ticket) =>
                new RegExp(ticket.status.replace(/\s/g, "")).test(/filters.status/gi) &&
                new RegExp(ticket.category.replace(/\s/g, "")).test(/filters.category/gi) &&
                new RegExp(ticket.agent_name.replace(/\s/g, "")).test(/filters.agent/gi) &&
                new RegExp(ticket.branch_company.replace(/\s/g, "")).test(/filters.client/gi) &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() >=
                  new Date(
                    filters.startDate !== null && filters.startDate
                  ).toISOString() &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() <=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            )
            .sort((a, b) => {
              return (
                Number(a.ticket_id.charAt(1)) - Number(b.ticket_id.charAt(1))
              );
            })
        : [];
        return data
  }, [
    filteredTickets,
    filters.agent,
    filters.category,
    filters.client,
    filters.endDate,
    filters.startDate,
    filters.status,
  ]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 container w-[90%] md:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col tracking-wider">
      {/**Filters or TopNav Small-Screens ================= */}
      <div
        onClick={() => setShowFilters(true)}
        className="h-12 w-full outline-none focus:outline-none dark:bg-slate-900 bg-slate-100 rounded-xl flex lg:hidden justify-center items-center"
      >
        <h5 className="uppercase font-bold text-base font-sans text-slate-500 tracking-wide">
          click here to select filters ...
        </h5>
        <div
          ref={filtersModalRef}
          className={`absolute w-[18rem] shadow-2xl left-[18%] md:left-[32%] top-[9rem] bg-[#33415563]  backdrop-blur-lg border border-slate-400 rounded-xl z-[999] flex lg:hidden flex-col space-y-2 p-4 items-center justify-center ${
            showFilters ? "" : "hidden"
          }`}
        >
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      </div>

      {/**Larger BreakPoint ============ */}
      <nav className="w-full rounded-xl hidden lg:grid grid-cols-6 gap-4">
        <Filters />
      </nav>
      {/**End Of Filters or TopNav ================= */}

      <TopCards />
      {/** Overview Report ============================ */}
      <div className="w-full rounded-xl bg-transparent grid grid-cols-3 lg:grid-cols-3 gap-4">
        <OverviewReport />
        <Tables />
      </div>
    </div>
  );
};

export default ReportsComponent;
