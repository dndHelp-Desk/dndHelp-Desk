import React, { useEffect, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";

const ReportsComponent = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const [data, setData] = useState([]);

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
    brand: "ppppp",
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
                ticket.ticket_id
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.ticket_id, "gi")) &&
                ticket.branch_company
                  .replace(/\s/g, "")
                  .match(new RegExp(filters.client, "gi")) &&
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
    filters.ticket_id,
  ]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 container w-[90%] md:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col tracking-wider">
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
