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
    <div className="bg-slate-500 p-2 mt-[-2rem] min-h-[40rem] absolute left-[9.5%] 2xl:left-[15%] z-0 2xl:w-[70%] rounded-xl w-[80%] space-y-4">
      {/**Filters or TopNav ================= */}
      <button
        onClick={() => setShowFilters(true)}
        className="h-12 w-full outline-none focus:outline-none bg-slate-900 rounded-xl flex lg:hidden justify-center items-center overflow-hidden"
      >
        <h5 className="uppercase font-bold text-base font-sans text-slate-500 tracking-wide">
          click here to select filters ...
        </h5>
        <div
          ref={filtersModalRef}
          className={`absolute w-[18rem] shadow-2xl left-[18%] md:left-[32%] top-[3.75rem]  backdrop-blur-lg border border-slate-400 rounded-xl z-[999] flex lg:hidden flex-col space-y-2 p-4 items-center justify-center ${
            showFilters ? "" : "hidden"
          }`}
        >
          <Filters />
        </div>
      </button>
      {/**Larger BreakPoint ============ */}
      <nav className="h-12 w-full bg-slate-900 rounded-xl hidden lg:grid grid-cols-5 p-1 gap-4 overflow-hidden">
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
