import { FC } from "react";
import Filters from "./Filters";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

interface Props {
  filters: any;
  setfiltersModal: any;
  filtersModal: any;
  setFilters: any;
  setList: any;
  contactsList: any;
}

const OffCanvasMenu: FC<Props> = ({
  filtersModal,
  setfiltersModal,
  filters,
  setFilters,
  setList,
  contactsList,
}) => {
  const closeCanvasRef = useOnClickOutside(() => {
    setfiltersModal(false);
  });

  //Component ================
  return (
    <div
      ref={closeCanvasRef}
      className={`absolute left-[-1rem] top-0 bottom-0 flex justify-center h-screen dark:bg-[#1e293bde] bg-slate-50 backdrop-blur-sm shadow-2xl pt-14 p-4 ${
        filtersModal ? "z-[9999] w-[18rem]" : "w-0 z-[-999]"
      } transition-all`}
    >
      <div
        className={`h-full flex flex-col items-center gap-2   ${
          filtersModal ? "w-full z-[999]" : "w-0 z-[-99]"
        } transition-all`}
      >
        <div className="flex items-center justify-between bg-inherit w-full mb-4">
          <h2 className="text-base font-sans capitalize text-slate-700 dark:text-slate-300">
            All Filters
          </h2>
          {/**Reset Filters ================ */}
          <button
            onClick={() => {
              setFilters({
                ticket_id: "",
                agent: "",
                category: "",
                complainant_number: "",
                status: "",
                priority: "",
                fcr: "no",
                reopened: false,
                overdue: false,
                hasRecording: false,
                time: { from: 1, to: 24 },
              });
              window.localStorage.setItem(
                "tickets_filters",
                JSON.stringify({
                  ticket_id: "",
                  agent: "",
                  category: "",
                  complainant_number: "",
                  status: "",
                  priority: "",
                  fcr: "no",
                  reopened: false,
                  overdue: false,
                  hasRecording: false,
                  time: { from: 1, to: 24 },
                })
              );
            }}
            className="h-8 p-1 px-4 rounded-sm outline-none focus:outline-none text-sm text-slate-700 dark:text-slate-300 border border-slate-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-750 hover:opacity-80 transition-all"
          >
            Reset
          </button>
        </div>
        <Filters
          filters={filters}
          setFilters={setFilters}
          setList={setList}
          contactsList={contactsList}
          filtersModal={filtersModal}
        />
      </div>
    </div>
  );
};

export default OffCanvasMenu;
