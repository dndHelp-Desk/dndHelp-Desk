import { FC, useEffect, useState } from "react";
import Tables from "./Tables";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import { useSelector } from "react-redux";
import Filters from "./Filters";
import { RootState } from "../../Redux/store";

const ReportsComponent: FC = () => {
  //Filters =====================
  const [filters, setFilters] = useState<any>({
    brand: "",
    ticket_id: "",
    agent: "",
    category: "",
    status: "",
  });
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );

  const reportsData = useSelector(
    (state: RootState) => state.Tickets.reportsData
  );

  const [data, setData] = useState<any>([]);

  //Filter Tickets Based On Acces Level ====
  useEffect(() => {
    setData(
      reportsData.length >= 1
        ? reportsData.filter(
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
              data.branch_company
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.brand, "gi")) &&
              data.status
                .replace(/\s/g, "")
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .match(new RegExp(filters.status, "gi"))
          )
        : []
    );
    if (member_details.length >= 1 && member_details[0]?.access === "admin") {
      setData(
        reportsData.length >= 1
          ? reportsData.filter(
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
                data.branch_company
                  .replace(/\s/g, "")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")
                  .match(new RegExp(filters.brand, "gi")) &&
                data.status
                  .replace(/\s/g, "")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")
                  .match(new RegExp(filters.status, "gi"))
            )
          : []
      );
    } else if (
      member_details.length >= 1 &&
      member_details[0].access === "client"
    ) {
      setData(
        reportsData.length >= 1
          ? reportsData.filter(
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
                data.branch_company
                  .replace(/\s/g, "")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")
                  .match(new RegExp(filters.brand, "gi")) &&
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
          : []
      );
    } else if (
      member_details.length >= 1 &&
      member_details[0].access === "agent"
    ) {
      setData(
        reportsData.length >= 1
          ? reportsData.filter(
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
                data.branch_company
                  .replace(/\s/g, "")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")
                  .match(new RegExp(filters.brand, "gi")) &&
                data.status
                  .replace(/\s/g, "")
                  .replace(/\(/g, "")
                  .replace(/\)/g, "")
                  .match(new RegExp(filters.status, "gi"))
            )
          : []
      );
    }
  }, [
    reportsData,
    filters.agent,
    filters.brand,
    filters.category,
    filters.status,
    member_details,
  ]);

  //Component =========================
  return (
    <div className="bg-transparent mt-4 w-[95%] 2xl:w-[75rem] rounded-xl min-h-screen space-y-4 flex flex-col tracking-wider relative pb-4">
      {/**Filters ============= */}
      <div className="w-full bg-transparent flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 print:hidden">
        <Filters setFilters={setFilters} filters={filters} />
      </div>

      {/**Stats ==================================== */}
      <TopCards data={data} />
      {/** Overview Report ============================ */}
      <div className="w-full rounded-xl bg-transparent">
        <OverviewReport data={data} filters={filters} />
      </div>
      <Tables data={data} />
    </div>
  );
};

export default ReportsComponent;
