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