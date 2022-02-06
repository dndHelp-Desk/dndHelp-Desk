import React from "react";
import AdditionalStats from "./AdditionalStats";
import Filters from "./Filters";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";

const ReportsComponent = () => {
  return (
    <div className="bg-slate-500 p-2 mt-[-2rem] min-h-[40rem] absolute left-[9.5%] 2xl:left-[15%] z-0 2xl:w-[70%] rounded-xl w-[80%] overflow-x-hidden space-y-4">
      {/**Filters or TopNav ================= */}
      <nav className="h-12 w-full bg-slate-900 rounded-xl grid grid-cols-5 p-1 gap-1 overflow-hidden">
        <Filters/>
      </nav>
      <TopCards />
      {/** Overview Report ============================ */}
      <div className="h-[20rem] md:h-[27rem] w-full rounded-xl bg-transparent grid grid-cols-3 md:grid-cols-5 gap-4">
        <OverviewReport />
        <AdditionalStats />
      </div>
    </div>
  );
};

export default ReportsComponent;
