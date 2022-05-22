import { FC, useEffect, useMemo, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import Filters from "./Filters";
import { RootState } from "../../Redux/store";

const ReportsComponent: FC = () => {
  // const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  //Filters =====================
  const [option, setOption] = useState<string | any>("branch_company");
  const [contactsList, setList] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({
    ticket_id: "",
    agent: "",
    category: "",
    status: "",
  });
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );

  const reportsData = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );

  //Filter Tickets Based On Acces Level ====
  const data = useMemo(() => {
    if (member_details.length >= 1 && member_details[0]?.access === "admin") {
      return reportsData.length >= 1
        ? reportsData
            ?.filter((row) =>
              contactsList?.every(
                (item) =>
                  item.toLowerCase()?.replace(/\s/g, "") !==
                  row.branch_company?.toLowerCase()?.replace(/\s/g, "")
              )
            )
            ?.filter(
              (data) =>
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
    } else if (
      member_details.length >= 1 &&
      member_details[0].access === "client"
    ) {
      return reportsData.length >= 1
        ? reportsData
            ?.filter((row) =>
              contactsList?.every(
                (item) =>
                  item.toLowerCase()?.replace(/\s/g, "") !==
                  row.branch_company?.toLowerCase()?.replace(/\s/g, "")
              )
            )
            ?.filter(
              (data) =>
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
                  .match(new RegExp(filters.status, "gi")) &&
                member_details[0]?.companies
                  .split(",")
                  .some(
                    (msg: any) =>
                      msg?.toLowerCase().replace(/\s/g, "") ===
                      data.branch_company?.toLowerCase().replace(/\s/g, "")
                  )
            )
        : [];
    } else if (
      member_details.length >= 1 &&
      member_details[0].access === "agent"
    ) {
      return reportsData.length >= 1
        ? reportsData
            ?.filter((row) =>
              contactsList?.every(
                (item) =>
                  item.toLowerCase()?.replace(/\s/g, "") !==
                  row.branch_company?.toLowerCase()?.replace(/\s/g, "")
              )
            )
            ?.filter(
              (data) =>
                data?.agent_email === member_details[0]?.email &&
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
    }
  }, [
    reportsData,
    filters.agent,
    filters.category,
    filters.status,
    member_details,
    contactsList,
  ]);

  //Check if The data is loading
  useEffect(() => {
    reportsData.length <= 0 ? setLoading(true) : setLoading(false);
    reportsData.length <= 0 && setTimeout(() => setLoading(false), 10000);
    return clearTimeout();
  }, [reportsData.length]);

  const tableData = useMemo(
    () =>
      Array.from(new Set(data?.map((data: any) => data[option])))?.map(
        (elem): any => ({
          name: elem,
          open: data
            ? data?.filter(
                (data: any) => data[option] === elem && data.status === "open"
              ).length
            : 0,
          solved: data
            ? data?.filter(
                (data: any) => data[option] === elem && data.status === "solved"
              ).length
            : 0,
          reopened: data
            ? data?.filter(
                (data: any) => data[option] === elem && data.reopened === true
              ).length
            : 0,
          total: data
            ? data?.filter((data: any) => data[option] === elem).length
            : 0,
        })
      ),
    [data, option]
  );

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

      {/**Preloader =========================== */}
      <div
        className={`${
          !loading ? "hidden" : ""
        } fixed z-[9] top-[2.5rem] bottom-0 left-0 right-0 bg-[#030d2769] before:content-[''] before:h-[0.25rem] before:w-full before:bg-[#93c4fd70] before:absolute`}
      >
        <div
          id="reportsPreloader"
          className="h-[0.25rem] w-2/5 bg-blue-600 absolute top-0 transition-all"
        ></div>
      </div>
    </div>
  );
};

export default ReportsComponent;
