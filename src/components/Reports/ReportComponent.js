import React ,{ useState }from "react";
import AdditionalStats from "./AdditionalStats";
import Filters from "./Filters";
import OverviewReport from "./OverviewReport";
import TopCards from "./TopCards";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef"

const ReportsComponent = () => {
  const [showFilters, setShowFilters] = useState(false)
  const filtersModalRef = useOnClickOutside(()=>{
    setShowFilters(false)
  })

  //Component =========================
  return (
    <div className="bg-transparent min-h-[40rem] mt-4 container w-[90%] sm:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col">
      {/**Filters or TopNav Small-Screens ================= */}
      <button
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
          <Filters />
        </div>
      </button>

      {/**Larger BreakPoint ============ */}
      <nav className="w-full rounded-xl hidden lg:grid grid-cols-5 gap-4">
        <Filters />
      </nav>
      {/**End Of Filters or TopNav ================= */}

      <TopCards />
      {/** Overview Report ============================ */}
      <div className="h-[20rem] md:h-[27rem] w-full rounded-xl bg-transparent grid grid-cols-3 lg:grid-cols-5 gap-4">
        <OverviewReport />
        <AdditionalStats />
      </div>
    </div>
  );
};

export default ReportsComponent;
