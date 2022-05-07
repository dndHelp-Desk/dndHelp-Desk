import { FC, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import Filters from "./Filters";
import { RootState } from "../../Redux/store";

const ReportsComponent: FC = () => {
  //Filters =====================
  const [filters, setFilters] = useState<any>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 31),
    brand: "",
    ticket_id: "",
    agent: "",
    category: "",
    status: "",
  });

  const filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const [data, setData] = useState<any>(
    filteredTickets.length >= 1
      ? filteredTickets.filter(
          (ticket: any) =>
            Number(new Date(ticket.date).getTime()) >=
              Number(new Date(filters.startDate).getTime()) &&
            Number(new Date(ticket.date).getTime()) <=
              Number(
                new Date(
                  new Date(filters.endDate).setDate(
                    new Date(filters.endDate).getDate() + 1
                  )
                ).getTime()
              )
        )
      : []
  );

  //Component =========================
  return (
    <div className="bg-transparent mt-4 w-[95%] 2xl:w-[75rem] rounded-xl min-h-screen gap-4 flex flex-col tracking-wider relative pb-4">
      {/**Filters ============= */}
      <div className="w-full bg-transparent flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 print:hidden">
        <Filters setFilters={setFilters} filters={filters} setData={setData} />
      </div>

      {/**Stats ==================================== */}
      <TopCards data={data} />
      {/** Overview Report ============================ */}
      <div className="w-full rounded-xl bg-transparent">
        <OverviewReport data={data} />
      </div>
      <Tables data={data} />
    </div>
  );
};

export default ReportsComponent;
