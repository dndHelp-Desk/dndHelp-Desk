import React, { useMemo, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import Filters from "./Filters";

const ReportsComponent = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
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
    status: "",
  });

  const data = useMemo(() => {
    return filteredTickets;
  }, [
    filteredTickets
  ]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 container w-[90%] md:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col tracking-wider relative">
      {/**Filters ============= */}
      <div className="w-full bg-transparent flex flex-wrap lg:flex-nowrap justify-between gap-4">
        <Filters setFilters={setFilters} filters={filters} />
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
