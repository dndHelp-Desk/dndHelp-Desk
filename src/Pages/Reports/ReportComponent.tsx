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
    time: { from: 1, to: 24 },
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
                item?.toLowerCase()?.replace(/\s/g, "") !==
                row.branch_company?.toLowerCase()?.replace(/\s/g, "")
            )
          )
          ?.filter(
            (data: any) =>
              data.message_position === 1 &&
              data.status
                ?.replace(/\s/g, "")
                ?.replace(/\(/g, "")
                ?.replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi")) &&
              data.category
                ?.replace(/\s/g, "")
                ?.replace(/\(/g, "")
                ?.replace(/\)/g, "")
                .match(new RegExp(filters.category, "gi")) &&
              data.agent_email
                ?.replace(/\s/g, "")
                ?.replace(/\(/g, "")
                ?.replace(/\)/g, "")
                .match(new RegExp(filters.agent, "gi")) &&
              data.status
                ?.replace(/\s/g, "")
                ?.replace(/\(/g, "")
                ?.replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi")) &&
              new Date(data.date).getHours() >= Number(filters?.time?.from) &&
              new Date(data.date).getHours() <= Number(filters?.time?.to)
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
    <div className="dark:bg-transparent bg-transparent w-full min-h-[calc(100%-3.65rem)] select-text tracking-wider relative py-4 px-4 oveflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar grid grid-cols-3 3xl:grid-cols-4 gap-4-">
      <div className="col-span-3 flex flex-col space-y-4">
        {/**Filters ============= */}
        <div className="w-full bg-transparent grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 print:hidden">
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

      <div className="col-span-1 hidden 3xl:flex"></div>
    </div>
  );
};

export default ReportsComponent;
