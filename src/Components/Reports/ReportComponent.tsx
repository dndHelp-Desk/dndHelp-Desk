import { FC, useEffect, useMemo, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import Filters from "./Filters";
import { RootState } from "../../Redux/store";

const ReportsComponent: FC = () => {
  // const [data, setData] = useState<any>([]);
  const ticketsComponentDates = useSelector(
    (state: RootState) => state.Tickets.ticketsComponentDates
  );
  //Filters =====================
  const [option, setOption] = useState<string | any>("branch_company");
  const [contactsList, setList] = useState<string[]>([]);
  const [reportsData, setReportsData] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({
    ticket_id: "",
    agent: "",
    category: "",
    status: "",
  });
  const fetchedTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  //Filter Tickets ====
  useEffect(() => {
    fetchedTickets &&
      setReportsData(
        fetchedTickets?.filter(
          (data: any) =>
            data?.date >= Number(ticketsComponentDates?.startDate) &&
            data?.date <=
              new Date(Number(ticketsComponentDates?.endDate) + 86400000)
        )
      );
  }, [fetchedTickets, ticketsComponentDates]);

  //Filter Tickets Based On Acces Level ====
  const data = useMemo(() => {
    return reportsData?.length >= 1
      ? reportsData
          ?.filter((row: any) =>
            contactsList?.every(
              (item: any) =>
                item.toLowerCase()?.replace(/\s/g, "") !==
                row.branch_company?.toLowerCase()?.replace(/\s/g, "")
            )
          )
          ?.filter(
            (data: any) =>
              data.message_position === 1 &&
              data.status
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi")) &&
              data.category
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.category, "gi")) &&
              data.agent_email
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.agent, "gi")) &&
              data.status
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi"))
          )
      : [];
  }, [reportsData, filters, contactsList]);

  const tableData = useMemo(() => {
    let names = Array.from(new Set(data?.map((data: any) => data[option])));
    const calcuFunction = (elem: any, param: any, opt: string | boolean) => {
      return data?.filter(
        (data: any) => data[option] === elem && data[param] === opt
      )?.length;
    };
    return names?.map((elem): any => ({
      name: elem,
      open: calcuFunction(elem, "status", "open"),
      solved: calcuFunction(elem, "status", "solved"),
      reopened: calcuFunction(elem, "reopened", true),
      total: data?.filter((data: any) => data[option] === elem)?.length,
    }));
  }, [data, option]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 w-[95%] 2xl:w-[75rem] rounded-xl min-h-screen space-y-4 flex flex-col tracking-wider relative pb-4">
      {/**Filters ============= */}
      <div className="w-full bg-transparent flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 print:hidden">
        <Filters
          setFilters={setFilters}
          filters={filters}
          setList={setList}
          contactsList={contactsList}
        />
      </div>

      {/**Stats ==================================== */}
      <TopCards data={data} />
      {/** Overview Report ============================ */}
      <div className="w-full rounded-xl bg-transparent">
        <OverviewReport data={data} />
      </div>
      <Tables
        data={data}
        option={option}
        setOption={setOption}
        tableData={tableData}
      />
    </div>
  );
};

export default ReportsComponent;
